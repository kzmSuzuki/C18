var express = require("express");
var router = express.Router();

const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

// 削除用のフォーム表示
router.get("/", function (req, res, next) {
  res.render("delete");
});

//　フォーム提出後の処理
router.post("/", async function (req, res, next) {
  try {
    await prisma.student.delete({
      where: { id: Number(req.body.id) },
    });
    res.status(200).redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting student");
  }
});

router.get("/all", async function (req, res, next) {
  try {
    const students = await prisma.student.deleteMany();
    res.status(200).redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving students");
  }
});

module.exports = router;
