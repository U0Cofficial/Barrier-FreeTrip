const express = require("express");
const router = express.Router();
const db = require("../db/database")

// 게시글 전체 조회
router.get("/", (req, res) => {
  db.all("SELECT * FROM community_posts ORDER BY created_at DESC", [], (err, rows) => {
    if (err) {
      console.error("게시글 조회 오류:", err);
      return res.status(500).json({ error: "서버 오류" });
    }
    // tags를 배열로 변환
    const posts = rows.map((row) => ({
      ...row,
      tags: row.tags ? row.tags.split(",") : [],
    }));
    res.json(posts);
  });
});

// 게시글 등록
router.post("/", (req, res) => {
  const { title, description, tags, image } = req.body;
  if (!title || !image) {
    return res.status(400).json({ error: "제목과 이미지 URL은 필수입니다." });
  }

  const tagString = Array.isArray(tags) ? tags.join(",") : tags;

  const sql = `
    INSERT INTO community_posts (title, description, tags, image)
    VALUES (?, ?, ?, ?)
  `;
  db.run(sql, [title, description, tagString, image], function (err) {
    if (err) {
      console.error("게시글 등록 오류:", err);
      return res.status(500).json({ error: "등록 실패" });
    }
    res.status(201).json({ message: "게시글 등록 완료", id: this.lastID });
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.run("DELETE FROM community_posts WHERE id = ?", [id], function (err) {
    if (err) {
      console.error("삭제 실패:", err);
      return res.status(500).json({ error: "삭제 중 오류 발생" });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "게시글이 존재하지 않음" });
    }
    res.json({ message: "삭제 성공", deletedId: id });
  });
});

module.exports = router;