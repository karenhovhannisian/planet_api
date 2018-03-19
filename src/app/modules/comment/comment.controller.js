import { SUCCESS_CODE } from '../../configs/status-codes';
import { CommentService } from '../../services';

export class CommentController {

    static async comment(req, res, next) {
        const { text, id } = req.body;
        let comment;
        try {
            // Check if comments exists by given id
            comment = await CommentService.getCommentById(id);

            return res.status(SUCCESS_CODE).json({
                comment: {
                    text: this.comment.text
                }
            });
        }
        catch (err) {
            return next(err);
        }
    }
}