import { Router } from 'express';
import { addMedicine, updateMed, deleteMed} from '../controllers/medicineLog.controller.js';
import { authMiddleware } from '../middlewares/jwtVerify.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';
const router = Router();

router.route("/add-med").post(authMiddleware,upload.single("medicinePhoto"),addMedicine);

router.route("/update-med/:id").put(authMiddleware,updateMed);

router.route("/delete-med/:id").delete(authMiddleware,deleteMed);


export default router;