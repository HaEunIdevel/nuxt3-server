/**
 * @swagger
 * /boards:
 *   get:
 *     description: ..
 *     summary: 게시글 가져오기
 *     tags: [Board]
 *     parameters:
 *          - in: query
 *            name: number
 *            type: int
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *              schema:
 *                 type: array
 *                 items:
 *                     properties:
 *                        title:
 *                            type: string
 *                            example: title...stupid...
 *                        contents:
 *                            type: string
 *                            example: what's the problem
 *   post:
 *      summary: 게시글 등록하기
 *      tags: [Board]
 *      responses:
 *          200:
 *              description: 성공
 *
 * /boards/{id}:
 *   get:
 *     summary: 특정 게시글 조회하기
 *     tags: [Board]
 *     parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: integer
 *              format: int64
 *              minium: 1
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *              schema:
 *                 type: object
 *                 items:
 *                     properties:
 *                        title:
 *                            type: string
 *                            example: title...stupid...
 *                        contents:
 *                            type: string
 *                            example: what's the problem
 */
