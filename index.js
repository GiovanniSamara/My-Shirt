import express from "express";
import path from "path";
import mysql from "mysql";
import session from "express-session";
import memoryStore from "memorystore";
import jsreport from 'jsreport';
import multer from 'multer';
import {v4}  from 'uuid';
//upload

// const storage = multer.diskStorage({
//     destination: './public/',
//     filename: function(req, file, cb){
//       cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
//   });
// const upload = multer({dest : 'public/'})
const multerStorage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,"public");
    },
    filename : (req,file,cb)=>{
        const nama = v4();
        const ext = file.mimetype.split('/')[1];
        cb(null,`${nama}.${ext}`)
    }
})
const upload = multer({
    storage : multerStorage
})

const app = express();

const SessionStore = memoryStore(session);

app.use(session({
    cookie: {
        httpOnly : false,
        sameSite : 'strict',
        maxAge : 1*60*60*1000
    },
    store : new SessionStore({
        checkPeriod : 1*60*60*1000
    }),
    name : 'SID',
    secret : 'secret',
    resave : false,
    saveUninitialized : false
}));

const pool = mysql.createPool({
    host:'localhost',
    user : 'root',
    password : '',
    database : 'pakaiancustom',
    connectionLimit : 10
})

const dbConnect = ()=>{
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,conn)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(conn);
            }
        })
    })
}

app.use(express.static(path.resolve('public')));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));
//upload
app.use(express.json());


const auth = (req,res,next)=>{
    if(req.session.username===undefined){
        res.redirect('/Login')
    }
    else{
        next();
    }
}

const cariakun = (conn)=>{
    return new Promise((resolve,reject)=>{
        conn.query('Select akun.username,akun.role ,akun.alamat,akun.email,akun.no_telp FROM akun WHERE akun.role!="Admin"',
        (err,result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

const validasi= (conn,masukan)=>{
    return new Promise((resolve,reject)=>{
        conn.query('UPDATE pesanan SET validasi ="y" WHERE id_pesanan=?',masukan,(err,result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(err);
            }
        } )
    })
}

const cariData = (conn)=>{
    return new Promise((resolve,reject)=>{
        conn.query('SELECT buktipembayaran.id_pesanan,pesanan.waktu,buktipembayaran.bukti,pesanan.detailpesanan FROM buktipembayaran inner join pesanan on buktipembayaran.id_pesanan = pesanan.id_pesanan WHERE pesanan.validasi="n"',
        (err,result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

const cekakun = (conn,masukan)=>{
    return new Promise((resolve,reject)=>{
        conn.query('SELECT username,role FROM akun WHERE username=? AND password=?',
        masukan,(err,result)=>{
           if(err){
               reject(err);
           } 
           else{
               resolve(result);
           }
        })
    })
}

const tambahakun = (conn,masukan)=>{
    return new Promise((resolve,reject)=>{
        conn.query('INSERT INTO akun(username,password,email,no_telp,alamat,role)VALUES(?,?,?,?,?,?)',
        masukan,(err,result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        } )
    })
}

const ambilPesanan = (conn)=>{
    return new Promise ((resolve,reject)=>{
        conn.query('SELECT * FROM pesanan',(err,result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

const updateStatus = (conn,masukan)=>{
    return new Promise((resolve,reject)=>{
        conn.query('UPDATE pesanan SET status=? WHERE id_pesanan=?',masukan,(err,result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

const hapusakun = (conn,masukan)=>{
    return new Promise((resolve,reject)=>{
        conn.query('DELETE FROM akun WHERE username=?',masukan,(err,result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}
const khususAdmin = (req,res,next)=>{
    if(req.session.role!=='Admin'){
        res.render('authorization',{
            pesan :"Anda dilarang mengakses halaman ini karena anda bukan Admin",
            nama : req.session.username
        });
    }
    else{
        next();
    }
}

const khususPemilik = (req,res,next)=>{
    if(req.session.role!=='Pemilik'){
        res.render('authorization',{pesan :"Anda dilarang mengakses halaman ini karena anda bukan Pemilik",nama : req.session.username});
    }
    else{
        next();
    }
}

const khususPemesan = (req,res,next)=>{
    if(req.session.role!=='Pemesan'){
        res.render('authorization',{pesan:"Anda dilarang mengakses halaman ini karena anda bukan Pemesan",nama : req.session.username});
    }
    else{
        next();
    }
}

const khususPemilikPemesan = (req,res,next)=>{
    if(req.session.role==='Pemilik' || req.session.role==='Pemesan' ){
        next();
    }
    else{
        res.render('authorization',{pesan :"Anda dilarang mengakses halaman ini karena anda bukan Pemesan atau Pemilik",nama : req.session.username});
    }
}

const cariIdentitas = (conn,masukan)=>{
    return new Promise((resolve,reject)=>{
        conn.query('Select alamat,email,no_telp FROM akun WHERE username=?',masukan,
        (err,result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

const updateIdentitasPemilik = (conn,diubah,masukan)=>{
    return new Promise((resolve,reject)=>{
        if(diubah==='username'){
            conn.query('UPDATE akun SET username=? WHERE username=?',masukan,(err,result)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }
            })
        }
        else if(diubah==='alamat'){
            conn.query('UPDATE akun SET alamat=? WHERE username=?',masukan,(err,result)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }
            })
        }
        else if(diubah==='email'){
            conn.query('UPDATE akun SET email=? WHERE username=?',masukan,(err,result)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }
            })
        }
        else{
            conn.query('UPDATE akun SET no_telp=? WHERE username=?',masukan,(err,result)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }
            })
        }


        
    })
}
//GET

app.get('/Home',auth,khususAdmin,async(req,res)=>{
    res.render('Home');
})

app.get('/HomePem',auth,khususPemilikPemesan,async(req,res)=>{
    res.render('HomePem');
})


const cariproduk = (conn)=>{
    return new Promise((resolve,reject)=>{
        conn.query('SELECT daftarproduk.biayajahit,daftarproduk.id_produk,model.namamodel,bahan.namabahan,model.gambarmodel,daftarproduk.hargaproduk FROM daftarproduk inner join model on model.id_model=daftarproduk.id_model inner join bahan on daftarproduk.id_bahan=bahan.id_bahan',
        (err,result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

const cariaksesoris = (conn)=>{
    return new Promise((resolve,reject)=>{
        conn.query('SELECT id_aksesoris,gambaraksesoris,namaaksesoris,hargaaksesoris,jumlahaksesoris FROM daftaraksesoris',
        (err,result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

const carisemuabahan = (conn)=>{
    return new Promise((resolve,reject)=>{
        conn.query('SELECT id_bahan,gambarbahan,namabahan,deskripsibahan FROM bahan',
        (err,result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}
app.get('/caridaftar',auth,khususPemilik,async(req,res)=>{
    const conn = await dbConnect();
    const semuaproduk = await cariproduk(conn);
    const semuaaksesoris = await cariaksesoris(conn);
    const semuabahan = await carisemuabahan(conn);
    conn.release();
    res.render('Daftar_produk_model',{
        semuaproduk,
        semuaaksesoris,
        semuabahan
    });
})

const laporan = (conn)=>{
    return new Promise((resolve,reject)=>{
        conn.query('SELECT id_pesanan,waktu,username,detailpesanan,total_biaya,status,validasi FROM pesanan',
        (err,result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

const carinamamodel =(conn)=>{
    return new Promise((resolve,reject)=>{
        conn.query('SELECT namamodel FROM model',
        (err,result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}
 

app.get('/carilaporan',auth,khususPemilik,async(req,res)=>{
    const conn = await dbConnect();
    const pesanans = await laporan(conn);
    const aks = await semuaaks(conn);
    const bahan = await carinamabahan(conn);
    const model = await carinamamodel(conn);
    conn.release();
    res.render('laporan',{
        pesanans,
        aks,
        bahan,
        model
    });
})

const cariTransaksi = (conn)=>{
    return new Promise((resolve,reject)=>{
        conn.query('SELECT pesanan.id_pesanan,pesanan.detailpesanan,pesanan.total_biaya,akun.alamat,pesanan.kurir,pesanan.noresi,pesanan.status_pesanan FROM pesanan inner join akun on pesanan.username=akun.username WHERE pesanan.validasi="y" ORDER BY id_pesanan ASC',
        (err,result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

app.get('/caritransaksi',auth,khususPemilik,async(req,res)=>{
    const conn = await dbConnect();
    const pesanans = await cariTransaksi(conn);
    conn.release();
    res.render('transaksi_pengiriman',{
        pesanans
    });
})

app.get('/caritambah',auth,khususPemilik,async(req,res)=>{
    res.render('tambah_model');
})

app.get('/Login',async(req,res)=>{
    res.render('Login',{
        message :''
    });
})


app.get('/',auth,async(req,res)=>{
    if(req.session.role==='Admin'){
        res.render('Home');
    }
    else{
        res.render('HomePem');
    }
    
})

app.get('/cariakun',auth,khususAdmin,async(req,res)=>{
    const conn = await dbConnect();
    const akun = await cariakun(conn);
    conn.release();
    res.render('Akun',{
        akuns : akun
    });
})

app.get('/caristatus',auth,khususAdmin,async(req,res)=>{
    const conn = await dbConnect();
    const pesanan = await ambilPesanan(conn);
    conn.release(); 
    res.render('Status',{
        pesanans : pesanan,
    });
})

app.get('/caridata',auth,khususAdmin,async(req,res)=>{
    const conn = await dbConnect();
    const hasils = await cariData(conn);
    conn.release();
    res.render('Data',{
        hasils
    });
})


app.get('/caricektoko',auth,khususPemilikPemesan,async(req,res)=>{
    const conn = await dbConnect();
    const identitas = await cariIdentitas(conn,req.session.username);
    conn.release();
    res.render('cek_toko',{
        username : req.session.username,
        identitas,
        role : req.session.role
    });
})



app.get('/validasi/:id_pesanan',auth,khususAdmin,async(req,res)=>{
    const conn = await dbConnect();
    const {id_pesanan} = req.params;
    await validasi(conn,id_pesanan);
    res.redirect('/caridata');
})

app.get('/updateStatus/:idPesanan',auth,khususAdmin,async(req,res)=>{
    const sekarang = new Date();
    const hari = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
    const bulan = ["January", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "December"];
    const waktu = hari[sekarang.getDay()]+', '+sekarang.getDate()+' '+bulan[sekarang.getMonth()]+' '+sekarang.getFullYear()+' Jam '+sekarang.getHours() +":"+sekarang.getMinutes();
    const {idPesanan} = req.params;
    const update = req.query.update;
    const masukan=[waktu+' '+update,idPesanan];
    const conn = await dbConnect();
    await updateStatus(conn,masukan);
    conn.release();
    res.redirect('/caristatus');
})

app.get('/logout',async(req,res)=>{
    if(req.session){
        req.session.destroy();
        res.redirect('/caristatus');
    }
})





//GET,POST,CONST YANG BERHUBUNGAN SAMA PEMESAN

const model = (conn,masukan)=>{
    return new Promise((resolve,reject)=>{
        if(masukan.length===3){
            conn.query('SELECT model.gambarmodel,model.namamodel,daftarproduk.hargaproduk FROM daftarproduk inner join model on daftarproduk.id_model=model.id_model inner join bahan on bahan.id_bahan =daftarproduk.id_bahan WHERE bahan.namabahan="katun" AND model.namamodel like ? LIMIT ?,?',
            masukan,(err,result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
        }
        else{
            conn.query('SELECT model.gambarmodel,model.namamodel,daftarproduk.hargaproduk FROM daftarproduk inner join model on daftarproduk.id_model=model.id_model inner join bahan on bahan.id_bahan =daftarproduk.id_bahan WHERE bahan.namabahan="katun" AND model.namamodel like ?',
            masukan,(err,result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
        
        }
})
}

app.get('/model',auth,khususPemilikPemesan,async(req,res)=>{
    req.session.model = undefined;
    req.session.bahan = undefined;
    req.session.hargaaksesoris = 0;
    req.session.gambarmodel = undefined;
    req.session.aksesoris = undefined;
    req.session.hargaproduk = undefined;
    req.session.warna = undefined;
    req.session.size = undefined;
    req.session.biayajahit = undefined;
    req.session.waktu = undefined;
    req.session.catatanaksesoris = undefined;
    let filter = req.query.filter;
    if(filter===undefined){
        filter = '%';
    }
    else{
        filter = '%'+filter+'%'
    }
    const conn = await dbConnect();
    const jumlah = await model(conn,[filter])
    const masukan = [filter,parseInt(req.query.start)||0,3];
    const produk = await model(conn,masukan);
    const jmlhPage = jumlah.length/3;
    conn.release();
    res.render('pilih_model_page',{
        produk,
        jmlhPage,
        start : req.query.start||0
    })
})

const infoModel = (conn,masukan)=>{
    return new Promise((resolve,reject)=>{
        conn.query('SELECT gambarmodel,deskripsimodel FROM model WHERE namamodel=?',masukan,
        (err,result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}


app.get('/detailpage/:namamodel/:harga',auth,khususPemilikPemesan,async(req,res)=>{
    const conn = await dbConnect();
    const {namamodel} = req.params;
    const {harga} = req.params;
    req.session.model = namamodel;
    req.session.hargaproduk = harga;
    req.session.hargaaksesoris = 0;
    const hasil = await infoModel(conn,namamodel);
    //hasil[0].gambarmodel ='/'+hasil[0].gambarmodel;
    req.session.gambar = hasil[0].gambarmodel; 
    conn.release();
    res.render('pilih_detail_page',{
        namamodel,
        hasil
    })
})
const bahan = (conn,masukan)=>{
    return new Promise((resolve,reject)=>{
        conn.query('SELECT bahan.gambarbahan,daftarproduk.hargaproduk,daftarproduk.biayajahit FROM bahan inner join daftarproduk on bahan.id_bahan=daftarproduk.id_bahan inner join model on daftarproduk.id_model=model.id_model WHERE namabahan=? AND namamodel=?',masukan,
        (err,result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}
const carinamabahan =(conn)=>{
    return new Promise((resolve,reject)=>{
        conn.query('SELECT namabahan,deskripsibahan FROM bahan',
        (err,result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}
app.get('/bahan',auth,khususPemilikPemesan,async(req,res)=>{
    req.session.bahan = req.query.bahan;
    const conn = await dbConnect();
    const hasil = await bahan(conn,[req.query.bahan,req.session.model]);
    const semuabahan = await carinamabahan(conn);
    conn.release();
    res.render('pilih_bahan_page',{
        hasil,
        bahan:req.query.bahan,
        model : req.session.model,
        semuabahan
    })
})
app.post('/bahan',async(req,res)=>{
    const conn = await dbConnect();
    const {warna,ukuran} = req.body;
    req.session.warna = warna;
    req.session.size = ukuran;
    res.redirect('/bahan?bahan=Katun');
})

app.get('/balikmodel',auth,khususPemilikPemesan,async(req,res)=>{
    req.session.model = undefined;
    req.session.warna = undefined;
    req.session.size = undefined;
    res.redirect('/model?start=0');
})

app.get('/backtodetail',auth,khususPemilikPemesan,async(req,res)=>{
    req.session.bahan = undefined;
    const redirect= '/detailpage/'+req.session.model+'/'+req.session.hargaproduk;
    res.redirect(redirect);
})

const cariGambar = (conn,masukan)=>{
    return new Promise((resolve,reject)=>{
        conn.query('SELECT gambarmodel FROM model WHERE namamodel=?',masukan,
        (err,result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}
app.get('/keranjang/:hargaBaru/:biayajahit',auth,khususPemilikPemesan,async(req,res)=>{
    const{hargaBaru,biayajahit} = req.params;
    req.session.hargaproduk = hargaBaru;
    req.session.biayajahit = biayajahit;
    const sekarang = new Date();
    const hari = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
    const bulan = ["January", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "December"];
    let jam = parseInt(sekarang.getHours());
    let menit = parseInt(sekarang.getMinutes());
    if(jam<10){
        jam='0'+jam;
    }
    if(menit<10){
        menit='0'+menit;
    }
    const waktu = hari[sekarang.getDay()]+', '+sekarang.getDate()+' '+bulan[sekarang.getMonth()]+' '+sekarang.getFullYear()+' Jam '+jam+":"+menit;
    req.session.waktu = waktu;
    const conn = await dbConnect();
    const gambar = await cariGambar(conn,req.session.model);
    conn.release();
    res.render('keranjang',{
        waktu : req.session.waktu,
        produk : req.session.model,
        size : req.session.size,
        warna :req.session.warna,
        bahan : req.session.bahan,
        aksesoris : req.session.aksesoris,
        hargaproduk:req.session.hargaproduk,
        hargaaksesoris : req.session.hargaaksesoris,
        biayajahit : req.session.biayajahit,
        catatanaksesoris : req.session.catatanaksesoris,
        gambar
    });
})

const aksrequest = (conn,masukan)=>{
    return new Promise((resolve,reject)=>{
        conn.query('SELECT namaaksesoris,gambaraksesoris,deskripsi,hargaaksesoris FROM daftaraksesoris WHERE namaaksesoris=?',masukan,
        (err,result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

const semuaaks = (conn)=>{
    return new Promise((resolve,reject)=>{
        conn.query('SELECT namaaksesoris FROM daftaraksesoris',
        (err,result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}
app.get('/aksesoris',auth,khususPemilikPemesan,async(req,res)=>{
    const aks = req.query.aks;
    req.session.aksesoris = req.query.aks;
    if(req.query.jahit!==undefined){
        req.session.biayajahit = req.query.jahit;
    }
    if(req.query.produk!==undefined){
        req.session.hargaproduk=req.query.produk;
    }
    const conn = await dbConnect();
    const hasil = await aksrequest(conn,aks);
    const semuaksesoris = await semuaaks(conn);
    res.render('Aksesoris',{
        hasil,
        semuaksesoris,
        model : req.session.model
    });
})
app.get('/keranjang2/:hargaaks',auth,khususPemilikPemesan,async(req,res)=>{
    const {hargaaks} = req.params;
    req.session.hargaaksesoris = hargaaks;
    console.log(req.query.catatanaksesoris);
    if(req.query.catatanaksesoris===''){
        req.session.catatanaksesoris = '-';    
    }else{
        req.session.catatanaksesoris = req.query.catatanaksesoris;
    }
    
    const sekarang = new Date();
    const hari = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
    const bulan = ['January', 'Februari', 'Maret', 'April', 'Mei', 'Juni','Juli', 'Agustus', 'September', 'Oktober', 'November', 'December'];
    let jam = parseInt(sekarang.getHours());
    let menit = parseInt(sekarang.getMinutes());
    if(jam<10){
        jam='0'+jam;
    }
    if(menit<10){
        menit='0'+menit;
    }

    const waktu = hari[sekarang.getDay()]+', '+sekarang.getDate()+' '+bulan[sekarang.getMonth()]+' '+sekarang.getFullYear()+' Jam '+jam +':'+menit;
    req.session.waktu = waktu;
    const conn = await dbConnect();
    const gambar = await cariGambar(conn,req.session.model);
    conn.release();
    res.render('keranjang',{
        waktu : req.session.waktu,
        produk : req.session.model,
        size : req.session.size,
        warna :req.session.warna,
        bahan : req.session.bahan,
        aksesoris : req.session.aksesoris,
        hargaproduk:req.session.hargaproduk,
        hargaaksesoris : req.session.hargaaksesoris,
        biayajahit : req.session.biayajahit,
        catatanaksesoris : req.session.catatanaksesoris,
        gambar
})
})
app.get('/balikbahan',auth,khususPemilikPemesan,async(req,res)=>{
    req.session.aksesoris = undefined;
    const redir = '/bahan?bahan='+req.session.bahan;
    res.redirect(redir);
})

const cariHistoriPesanan = (conn,masukan)=>{
    return new Promise((resolve,reject)=>{
        conn.query("SELECT waktu,detailpesanan,total_biaya,status_pesanan,status,kurir,noresi,catatanaksesoris,validasi,buktipembayaran.bukti FROM pesanan inner join buktipembayaran on pesanan.id_pesanan=buktipembayaran.id_pesanan WHERE username=? ORDER BY pesanan.id_pesanan DESC",masukan,
        (err,result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

const cariSemuaGambarModel = (conn)=>{
    return new Promise((resolve,reject)=>{
        conn.query("SELECT namamodel,gambarmodel FROM model",
        (err,result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

const caribiayaaksesoris = (conn)=>{
    return new Promise((resolve,reject)=>{
        conn.query("SELECT namaaksesoris,hargaaksesoris FROM daftaraksesoris",
        (err,result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

const caribiayajahit = (conn)=>{
    return new Promise((resolve,reject)=>{
        conn.query("SELECT daftarproduk.biayajahit, daftarproduk.hargaproduk, model.namamodel,bahan.namabahan FROM daftarproduk inner join model on daftarproduk.id_model=model.id_model inner join bahan on daftarproduk.id_bahan = bahan.id_bahan",
        (err,result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}



app.get('/transaksi',auth,khususPemilikPemesan,async(req,res)=>{
    const conn = await dbConnect();
    const histori = await cariHistoriPesanan(conn,req.session.username);
    const semuagambarmodel = await cariSemuaGambarModel(conn);
    const biayaaksesoris = await caribiayaaksesoris(conn);
    const biayajahitdanhargaproduk = await caribiayajahit(conn);
    console.log("dari /transaksi"+req.session.catatanaksesoris)
    conn.release(); 
    res.render('transaksi',{
        produk : req.session.model,
        warna : req.session.warna,
        ukuran : req.session.size,
        bahan : req.session.bahan,
        aksesoris : req.session.aksesoris,
        hargaproduk : req.session.hargaproduk,
        biayajahit : req.session.biayajahit,
        hargaaksesoris : req.session.hargaaksesoris,
        waktu : req.session.waktu,
        gambar : req.session.gambar,
        bukti : req.session.bukti,
        hasil : histori,
        catatanaksesoris:req.session.catatanaksesoris,
        semuagambarmodel,
        biayaaksesoris,
        biayajahitdanhargaproduk
    })
})

function hancurinSession(req){
    req.session.model = undefined;
    req.session.warna= undefined;
    req.session.size= undefined;
    req.session.bahan= undefined;
    req.session.aksesoris= undefined;
    req.session.hargaproduk= undefined;
    req.session.biayajahit= undefined;
    req.session.hargaaksesoris= undefined;
    req.session.waktu= undefined;
    req.session.gambar= undefined;
    req.session.bukti= undefined;
    req.session.catatanaksesoris = undefined;
}

const masukanpesanan =(conn,masukan)=>{
    return new Promise((resolve,reject)=>{
        conn.query("INSERT INTO pesanan(detailpesanan,total_biaya,waktu,username,kurir,noresi,catatanaksesoris,status_pesanan,status,validasi) VALUES(?,?,?,?,'-','-',?,'-','-','n')",masukan,
        (err,result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

const masukanbukti =(conn,masukan)=>{
    return new Promise((resolve,reject)=>{
        conn.query("INSERT INTO buktipembayaran(id_pesanan,bukti) VALUES((SELECT id_pesanan FROM pesanan where detailpesanan=? AND total_biaya=? AND waktu=? AND username=?),?)",masukan,
        (err,result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}



app.post('/uploadBukti',upload.single('foto'),async(req,res)=>{
    console.log(req.file);
    req.session.bukti = req.file.filename;
    let detailpesanan='';
    if(req.session.aksesoris===undefined){
        detailpesanan = 'Produk:'+req.session.model+'+Warna:'+req.session.warna+'+Ukuran:'+req.session.size+'+Bahan:'+req.session.bahan+'+Aksesoris:-';
    }else{
        detailpesanan = 'Produk:'+req.session.model+'+Warna:'+req.session.warna+'+Ukuran:'+req.session.size+'+Bahan:'+req.session.bahan+'+Aksesoris:'+req.session.aksesoris;
    }
    const totalBiaya ='Rp '+ (parseInt(req.session.hargaproduk)+parseInt(req.session.biayajahit)+parseInt(req.session.hargaaksesoris));
    const waktu = req.session.waktu;
    const conn = await dbConnect();
    if(req.session.catatanaksesoris===undefined||req.session.catatanaksesoris===''){
        req.session.catatanaksesoris ='-';
    }
    await masukanpesanan(conn,[detailpesanan,totalBiaya,waktu,req.session.username,req.session.catatanaksesoris]);
    await masukanbukti(conn,[detailpesanan,totalBiaya,waktu,req.session.username,req.session.bukti]);
    hancurinSession(req);
    res.redirect('/transaksi');
    
})
// app.post('/catatanaksesoris',async(req,res)=>{
//    const {catatanaksesoris} = req.body;
//    req.session.catatanaksesoris = catatanaksesoris;
//    res.statusCode =202;
// })

//akhir
















const updateHargaProduk = (conn,masukan)=>{
    return new Promise((resolve,reject)=>{
       conn.query('UPDATE daftarproduk SET hargaproduk=? WHERE id_produk=?',masukan,
        (err,result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

const updateHargaAksesoris = (conn,masukan)=>{
    return new Promise((resolve,reject)=>{
        conn.query('UPDATE daftaraksesoris SET hargaaksesoris=? WHERE id_aksesoris=?',masukan,
        (err,result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

const updateJumlahAksesoris = (conn,masukan)=>{
    return new Promise((resolve,reject)=>{
        conn.query('UPDATE daftaraksesoris SET jumlahaksesoris=? WHERE id_aksesoris=?',masukan,
        (err,result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

const ubahtransaksi = (conn,ubah,masukan)=>{
    return new Promise((resolve,reject)=>{
        if(ubah==='kurir'){
            conn.query('UPDATE pesanan SET kurir=? WHERE id_pesanan=?',masukan,
            (err,result)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }
            })
        }
        else if(ubah==='noresi'){
            conn.query('UPDATE pesanan SET noresi=? WHERE id_pesanan=?',masukan,
            (err,result)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }
            })
        }
        else{
            conn.query('UPDATE pesanan SET status_pesanan=? WHERE id_pesanan=?',masukan,
            (err,result)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }
            })
        }
        
    })
}
app.get('/signup',async(req,res)=>{
    res.render('sign_up',{
        pesan : undefined
    });
})
const signup = (conn,masukan)=>{
    return new Promise((resolve,reject)=>{
        conn.query('INSERT INTO akun(username,password,email,no_telp,alamat,role) VALUES(?,?,?,?,?,"Pemesan")',masukan,
        (err,result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}
app.post('/signup',async(req,res)=>{
    const conn = await dbConnect();
    const {username,password,email,telepon,alamat} = req.body;
    if(email.includes("@")===false){
        res.render('sign_up',{
            pesan:"Pastikan ada karakter @ pada email anda"
        })
    }else if(username.length>50){
        res.render('sign_up',{
            pesan : "Username tidak boleh melebihi 50 karakter"
        })
    }else if(password.length>50){
        res.render('sign_up',{
            pesan : "Password tidak boleh melebihi 50 karakter"
        })
    }
    else if(password.length<5){
        res.render('sign_up',{
            pesan : "Password harus terdiri dari minimal 5 karakter"
        })
    }
    else if(telepon.length!==12){
        res.render('sign_up',{
            pesan : "Nomor Telepon harus terdiri dari 12 digit"
        })
    }
    else if(alamat.length>50){
        res.render('sign_up',{
            pesan : "Alamat tidak boleh melebihi 50 karakter"
        })
    }
    else if(username.length===0||password.length===0||email.length===0||telepon.length===0||alamat.length===0){
        res.render('sign_up',{
            pesan : "Harap isi identitas dengan lengkap"
        })
    }
    else{
        const masukan =[username,password,email,telepon,alamat];
        await signup(conn,masukan);
        conn.release();
        res.redirect('/Login');
    }
})
app.post('/ubahtransaksi/:ubah/:id_pesanan',async(req,res)=>{
    const conn = await dbConnect();
    const {update} = req.body;
    const {ubah,id_pesanan} = req.params;
    const masukan = [update,id_pesanan];
    await ubahtransaksi(conn,ubah,masukan);
    conn.release();
    res.redirect('/caritransaksi');

})

app.post('/updateHargaAksesoris/:id_aksesoris',async(req,res)=>{
    const conn =await dbConnect();
    const {hargaAks} = req.body;
    const {id_aksesoris} = req.params;
    const masukan = [hargaAks,id_aksesoris];
    await updateHargaAksesoris(conn,masukan);
    conn.release();
    res.redirect('/caridaftar')
})

app.post('/updateJumlahAksesoris/:id_aksesoris',async(req,res)=>{
    const conn =await dbConnect();
    const {jumlahAks} = req.body;
    const {id_aksesoris} = req.params;
    const masukan = [jumlahAks,id_aksesoris];
    await updateJumlahAksesoris(conn,masukan);
    conn.release();
    res.redirect('/caridaftar');
})

app.post('/updateHargaProduk/:id_produk',async(req,res)=>{
    const conn = await dbConnect();
    const {harga} = req.body;
    const {id_produk} = req.params;
    const masukan = [harga,id_produk]
    await updateHargaProduk(conn,masukan);
    conn.release();
    res.redirect('/caridaftar');
})

const updatehargajahit = (conn,masukan)=>{
    return new Promise((resolve,reject)=>{
        conn.query('UPDATE daftarproduk SET biayajahit=? WHERE id_produk=?',masukan,
        (err,result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}
app.post('/updatejahit/:id_produk',async(req,res)=>{
    const conn = await dbConnect();
    const {updatejahit} = req.body;
    const {id_produk} = req.params;
    const masukan = [updatejahit,id_produk]
    await updatehargajahit(conn,masukan);
    conn.release();
    res.redirect('/caridaftar');
})


app.post('/updateIdentitasPemilik/:username/:apaygmaudiubah',async(req,res)=>{
    const conn = await dbConnect();
    const {username,apaygmaudiubah} = req.params;
    const {updateidentitas} = req.body;
    const masukan =[updateidentitas,username];
    if(apaygmaudiubah==='username'){
        req.session.username = updateidentitas;
    }
    await updateIdentitasPemilik(conn,apaygmaudiubah,masukan);
    conn.release();
    res.redirect('/caricektoko');
})

app.post('/cekakun', async(req,res)=>{
    const conn = await dbConnect();
    const {username,password} = req.body;
    const input = [username,password];
    if(username=='' || password===''){
        res.render('Login',{
            message :'Anda belum mengisi Username atau Password'
        });
    }
    else if(username.length>50){
        res.render('Login',{
            message : 'Username anda salah'
        })
    }
    else if(password.length>50 || password.length<5){
        res.render('Login',{
            message : 'Password anda salah'
        })
    }
    else{
        const hasil = await cekakun(conn,input);
        conn.release();
        if(hasil.length===0){
            res.render('Login',{
                message : 'Maaf, Username atau password anda salah'
            });
        }
        else{
            req.session.username = hasil[0].username;
            req.session.role = hasil[0].role;
            if(req.session.role==='Admin'){
                res.redirect('/Home');
            }
            else{
                res.redirect('/HomePem');
            }
            
            
        }
    }
})

app.post('/tambahakun',auth,khususAdmin,async(req,res)=>{
    const {username,password,alamat,telepon,email} = req.body;
    const masukan = [username,password,email,telepon,alamat,"Pemesan"] ;
    const conn = await dbConnect();
    await tambahakun(conn,masukan);
    conn.release();
    res.redirect('/cariakun');
})



app.post('/hapusakun',auth,khususAdmin,async(req,res)=>{
    const {filterHapus} = req.body;
    const masukan = [filterHapus];
    const conn = await dbConnect();
    await hapusakun(conn,masukan);
    conn.release();
    res.redirect('/cariakun');
})

const updatebahan = (conn,masukan)=>{
    return new Promise((resolve,reject)=>{
        conn.query('UPDATE bahan SET deskripsibahan=? WHERE id_bahan=?',masukan,
        (err,result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

app.post('/updatedeskripsibahan/:id_bahan',async(req,res)=>{
    const conn = await dbConnect();
    const{id_bahan} = req.params;
    const {updatedeskripsibahan} = req.body;
    await updatebahan(conn,[updatedeskripsibahan,id_bahan]);
    conn.release();
    res.redirect('/caridaftar');
})

app.listen(8080);