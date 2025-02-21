import Surah from '../models/SurahModel.js';
import Users from '../models/UserModel.js';
import { Op, where } from 'sequelize';

export const getSurah = async(req, res) => {
    try {
        let response;
        if (req.role === 'admin') {
            response = await Surah.findAll({
                attributes: ['uuid', 'name', 'ayat'],
                include: [{
                    model: Users,
                    attributes: ['name', 'email']
                }]
            });
        }
        else {
            response = await Surah.findAll({
                attributes: ['uuid', 'name', 'ayat'],
                where: {
                    userId: req.userId
                },
                include: [{
                    model: Users,
                    attributes: ['name', 'email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};


export const getSurahById = async(req, res) => {
    try {
        const surah = await Surah.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!surah) return res.status(404).json({msg: "Data tidak ditemukan"});

        let response;
        if (req.role === 'admin') {
            response = await Surah.findOne({
                attributes: ['uuid', 'name', 'ayat'],
                where: {
                    id: surah.id
                },
                include: [{
                    model: Users,
                    attributes: ['name', 'email']
                }]
            });
        }
        else {
            response = await Surah.findOne({
                attributes: ['uuid', 'name', 'ayat'],
                where: {
                    [Op.and]: [{id: surah.id}, {userId: req.userId}]
                },
                include: [{
                    model: Users,
                    attributes: ['name', 'email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const createSurah = async(req, res) => {

    const { name, ayat } = req.body;
    try {
        await Surah.create({
            name: name,
            ayat: ayat,
            userId: req.userId
        });
        res.status(201).json({msg: "Surah berhasil ditambahkan"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const updateSurah = async(req, res) => {
    try {
        const surah = await Surah.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!surah) return res.status(404).json({msg: "Data tidak ditemukan"});

        const { name, ayat } = req.body;
        if (req.role === 'admin') {
            await surah.update({name, ayat},{
                where: {
                    id: surah.id
                }
            });
        }
        else {
            if (req.userId !== surah.userId) return res.status(403).json({msg: "Akses ditolak"});
            await surah.update({name, ayat},{
                where: {
                    [Op.and]: [{id: surah.id}, {userId: req.userId}]
                },
            });
        }
        res.status(200).json({msg: "Data berhasil diupdate"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const deleteSurah = async(req, res) => {
    try {
        const surah = await Surah.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!surah) return res.status(404).json({msg: "Data tidak ditemukan"});

        const { name, ayat } = req.body;
        if (req.role === 'admin') {
            await surah.destroy({
                where: {
                    id: surah.id
                }
            });
        }
        else {
            if (req.userId !== surah.userId) return res.status(403).json({msg: "Akses ditolak"});
            await surah.destroy({
                where: {
                    [Op.and]: [{id: surah.id}, {userId: req.userId}]
                },
            });
        }
        res.status(200).json({msg: "Data berhasil dihapus"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};