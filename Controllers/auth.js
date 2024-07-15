const User = require('../Model/Users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


exports.register = async (req, res) => {
    try {
        // 1. Check ว่า user เคยมี Database หรือยัง
        const { name, password } = req.body         // Destructuring แยกข้อมูลออก
        var user = await User.findOne({ name })   // หาว่า name มีไหม

        if (user) {                                 // มี user แล้ว มีบัญชีแล้ว
            return res.send('User Already Exists').status(400)
        }


        // 2. Encrypt เข้ารหัส password (hash)
        const salt = await bcrypt.genSalt(10)
        user = new User ({
            name,
            password
        })
        user.password = await bcrypt.hash(password, salt)


        // 3. Save ข้อมูล
        await user.save()
        res.send('Register Success!!!')
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
}

exports.login = async (req, res) => {
    try {
        // 1. Check ว่า name, password ถูกต้องไหม
        const { name, password } = req.body
        var user = await User.findOneAndUpdate({ name }, { new: true })     // Update ด้วยเพราะสามารถนำไปดูได้ว่า login ครั้งล่าสุดเมื่อไหร่

        if (user) {                                                         // Check ว่า user มีไหม
            const isMatch = await bcrypt.compare(password, user.password)   // Check ว่า password ถูกไหม
            if (!isMatch) {
                return res.status(400).send('Password Invalid!!') 
            } 
        
            // 2. สร้าง Payload (เตรียมข้อมูลส่งไปหน้าบ้าน)
            var payload = {
                user: {
                    name: user.name
                }
            }

            // 3. สร้าง Token
            jwt.sign(payload, 'jwtsecret', { expiresIn: 20 }, (err, token) => {
                if (err) throw err
                res.json({ token, payload })
            })
        } else {    // กรณีที่ไม่มี user
            return res.status(400).send('User not found!!!')
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
}