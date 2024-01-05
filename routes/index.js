import express from "express";
import { Register, Login, Logout, UpdateProfil, SelectProfil } from "../controllers/UsersController.js";
import { CreateMotivasi, SelectAllMotivasi, SelectMotivasiSaya, SelectMotivasiByJenisMotivasi, SelectMotivasiById, UpdateMotivasi, DeleteMotivasi } from "../controllers/MotivasiController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken, serverOn } from "../controllers/RefreshToken.js";
import multer from "multer"
import path from "path"

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.parse(file.originalname).name + Math.round(Math.random() * 1E9) + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage,limits:{fieldSize: 25 * 1024 * 1024}})

router.get('/', serverOn)
//LoginRegis
router.get('/usersBE', verifyToken)
router.get('/tokenBE', refreshToken)
router.post('/usersBE', Register)
router.post('/loginBE', Login)
router.delete('/logoutBE', Logout)
//Profil
router.patch('/updateProfilBE', upload.single("foto"), UpdateProfil)
router.get('/selectProfilBE/:panggilanParams', SelectProfil)
//Motivasi
router.post('/createMotivasiBE', CreateMotivasi)
router.get('/selectAllMotivasiBE', SelectAllMotivasi)
router.get('/selectMotivasiByJenisMotivasiBE/:panggilanParams', SelectMotivasiByJenisMotivasi)
router.get('/selectMotivasiByIdBE/:panggilanParams', SelectMotivasiById)
router.get('/selectMotivasiSayaBE/:panggilanParams', SelectMotivasiSaya)
router.patch('/updateMotivasiBE', UpdateMotivasi)
router.delete('/deleteMotivasiBE/:id', DeleteMotivasi)

export default router