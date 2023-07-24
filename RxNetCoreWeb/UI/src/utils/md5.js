var md5 = require('./md5.min.js');
export function hashPwd(pwd, randSalt, staticSalt) {
    var h1 = md5(pwd + staticSalt);
    //console.log(h1);
    var h2 = md5(h1 + randSalt);
    //console.log(h2);
    return md5(md5(pwd + staticSalt) + randSalt);
}