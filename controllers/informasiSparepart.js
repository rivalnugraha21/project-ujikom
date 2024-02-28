const db = require("../database/models");
const Informasi = db.Informasi;

// CREATE: Menambahkan data ke dalam tabel informasi
exports.create = (req, res) => {
    // Validasi permintaan
    if (!req.body.nama_informasi) {
        return res.status(400).send({
            message: "Nama informasi tidak boleh kosong",
        });
    }

    // Data yang diperoleh dari inputan oleh pengguna
    const informasi = {
        nama_informasi: req.body.nama_informasi,
    };

    // Proses menyimpan ke dalam database
    Informasi.create(informasi).then((data) => {
        res.json({
            message: "Informasi berhasil dibuat.",
            data: data,
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message || "Terjadi kesalahan saat membuat Informasi.",
            data: null,
        });
    });
};

// READ: Menampilkan atau mengambil semua data dari tabel kategoris
exports.findAll = (req, res) => {
    Informasi.findAll().then((kategoris) => {
        res.json({
            message: "Data kategoris berhasil diambil.",
            data: kategoris,
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message || "Terjadi kesalahan saat mengambil data kategoris.",
            data: null,
        });
    });
};

// UPDATE: Merubah data sesuai dengan id yang dikirimkan sebagai params 
exports.update = (req, res) => {
    const id = req.params.id;

    // Field untuk memperbarui data kategori
    const kategoriData = {
        nama_kategori: req.body.nama_kategori,
        // Tambahkan bidang lain sesuai kebutuhan
    };

    Kategori.update(kategoriData, {
        where: { id },
    }).then((num) => {
        if (num == 1) {
            res.json({
                message: "Kategori berhasil diperbarui.",
                data: kategoriData,
            });
        } else {
            res.json({
                message: "Tidak dapat memperbarui kategori dengan id=${id}. Mungkin kategori tidak ditemukan atau req.body kosong!",
                data: kategoriData,
            });
        }
    }).catch((err) => {
        res.status(500).json({
            message: err.message || "Terjadi kesalahan saat memperbarui kategori.",
            data: null,
        });
    });
};

// DELETE: Menghapus data sesuai id yang dikirimkan
exports.delete = (req, res) => {
    const id = req.params.id;
    Kategori.destroy({
        where: { id },
    }).then((num) => {
        if (num == 1) {
            res.json({
                message: "Kategori berhasil dihapus.",
                data: req.body,
            });
        } else {
            res.json({
                message: "Tidak dapat menghapus kategori dengan id=${id}. Mungkin kategori tidak ditemukan!",
                data: req.body,
            });
        }
    }).catch((err) => {
        res.status(500).json({
            message: err.message || "Terjadi kesalahan saat menghapus kategori.",
            data: null,
        });
    });
};

// BONUS ===> Mengambil data sesuai id yang dikirimkan
exports.findOne = (req, res) => {
    Kategori.findByPk(req.params.id).then((kategori) => {
        if (!kategori) {
            return res.status(404).json({
                message: "Kategori dengan id=${req.params.id} tidak ditemukan.",
                data: null,
            });
        }
        res.json({
            message: "Kategori berhasil ditemukan.",
            data: kategori,
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message || "Terjadi kesalahan saat mengambil kategori.",
            data: null,
        });
    });
};