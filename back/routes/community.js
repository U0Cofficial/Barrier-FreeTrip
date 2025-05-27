const express = require("express");
const router = express.Router();
const db = require("../db/database")

// 게시글 전체 조회 (PostgreSQL, async/await)
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM community_posts ORDER BY created_at DESC");
    const posts = result.rows.map((row) => ({
      ...row,
      tags: row.tags ? row.tags.split(",") : [],
    }));
    res.json(posts);
  } catch (err) {
    console.error("게시글 조회 오류:", err);
    res.status(500).json({ error: "서버 오류" });
  }
});

// 게시글 등록 (PostgreSQL, async/await)
router.post("/", async (req, res) => {
  const { title, description, tags, image } = req.body;
  if (!title || !image) {
    return res.status(400).json({ error: "제목과 이미지 URL은 필수입니다." });
  }

  const tagString = Array.isArray(tags) ? tags.join(",") : tags;

  try {
    const result = await db.query(
      `INSERT INTO community_posts (title, description, tags, image)
       VALUES ($1, $2, $3, $4) RETURNING id`,
      [title, description, tagString, image]
    );
    res.status(201).json({ message: "게시글 등록 완료", id: result.rows[0].id });
  } catch (err) {
    console.error("게시글 등록 오류:", err);
    res.status(500).json({ error: "등록 실패" });
  }
});

// 게시글 삭제 (PostgreSQL, async/await)
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.query("DELETE FROM community_posts WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "게시글이 존재하지 않음" });
    }
    res.json({ message: "삭제 성공", deletedId: id });
  } catch (err) {
    console.error("삭제 실패:", err);
    res.status(500).json({ error: "삭제 중 오류 발생" });
  }
});

module.exports = router;