import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import cors from "cors";
import { options } from "./swagger/config.js";
import mongoose from "mongoose";

import { Board } from "./model/board.model.js";

const boardApp = express();
const port = 4000;

boardApp.use(cors());
boardApp.use(express.json());
mongoose.connect("mongodb://database-mongo:27017/nuxtpj"); // 해당 DB없으면 자동으로 만들어짐.
boardApp.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJSDoc(options))
);

boardApp.get("/boards", async (req, res) => {
  const result = await Board.find();

  res.send(result);
});

boardApp.post("/boards", async (req, res) => {
  const board = new Board({
    title: req.body.title,
    contents: req.body.contents,
  });

  await board.save();

  res.send("게시물이 성공적으로 등록되었습니다.");
});

boardApp.get("/boards/:id", async (req, res) => {
  try {
    const boardId = req.params._id;

    // 해당 보드의 게시물들을 조회합니다.
    const board = await Board.findById(boardId);

    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }

    res.status(200).json({ board });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

boardApp.patch("/boards/:id/edit", async (req, res) => {
  const id = req.param._id;

  try {
    const board = await Board.findById(id);
    if (!board) {
      return res.status(404).json({ error: "게시물을 찾을 수 없습니다." });
    }

    if (req.body.title) {
      board.title = req.body.title;
    }

    if (req.body.contents) {
      board.contents = req.body.contents;
    }

    const updatedBoard = await board.save();
    return res.json(updatedBoard);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "서버 에러 - 게시물 수정에 실패했습니다." });
  }
});

// 게시물을 삭제하는 API 엔드포인트
boardApp.delete("/boards/:id/delete", async (req, res) => {
  const id = req.params._id;
  try {
    const deletedPost = await Board.findByIdAndDelete(id);
    if (deletedPost) {
      res.status(200).json({ message: "게시물이 성공적으로 삭제되었습니다." });
    } else {
      res.status(404).json({ message: "게시물을 찾을 수 없습니다." });
    }
  } catch (err) {
    res.status(500).json({ message: "게시물을 삭제할 수 없습니다." });
  }
});

boardApp.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
