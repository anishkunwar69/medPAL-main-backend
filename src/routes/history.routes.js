import { Router } from 'express';
const router = Router();

router.route("/see-history").get((req,res)=>res.send("all history"))

export default router;