require('dotenv').config();
const express=require('express');
const router =express.Router();
const stripe=require('stripe')(process.env.TEST_KEY);

router.post('/payments',async(req,res)=>{
    try {
        const usExchangeRate=0.055;
        const OnePennie = 100;
        const paymenItent=await stripe.paymentIntents.create({
            amount:(req.body.amount*usExchangeRate*OnePennie).toFixed(0),
            currency:'usd',
            automatic_payment_methods:{
                enabled:true
            }
        })
        res.json({paymenItent:paymenItent.client_secret})
    } catch (error) {
        res.status(400).json({ error :error.message });
    }
})

module.exports=router;