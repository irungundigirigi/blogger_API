const multer = require('multer') ;

    //multer storage confuguration
    const storage = multer.diskStorage({
        destination:function(req,file,cb) {
        cb(null,'./uploads');
        },
        filename: function(req,file,cb){
        cb(null,Date.now() + '.jpg');
        }
    })
    const fileFilter = (req,file,cb) => {
        if((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg')){
            cb(null,true)
        }else{
            cb(null,false)
        };
    };
    let upload = multer({storage:storage,fileFilter:fileFilter})
module.exports = upload    

