const User = require('./../models/user');
const TestData= require('./../models/testData');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Big5Data=require('./../models/big5data');

exports.createUser = catchAsync(async (req, res, next) => {
    // console.log(req.body);
    const newUser =await User.create({
      name: req.body.name,
      school: req.body.school,
      email:req.body.email,
      city:req.body.city,
      tenth_per:req.body.tenth_per,
      stream:req.body.stream
    });

    if(!newUser){
        return next(new AppError('error in creating new user!', 400));
    }
    else{
        res.status(200).json({
            status: 'success',
            data: {
              newUser
            }
        });
    }
});

exports.testRecord=catchAsync(async(req,res)=>{
    // console.log(req.body);
    const user=req.body.userId;
    const data=req.body.data;

    const simpleObject = data.reduce((acc, obj) => {
        return { ...acc, ...obj };
    }, { userId: user });

    // console.log('simpleobj:::',simpleObject);
      
    
    function extractNumericValue(str) {
        const match = str.match(/value:(\d+(\.\d+)?)/);
        return match ? parseFloat(match[1]) : 0;
    }
    
    // Process the input object and create a new object with trimmed values
    const trimmedObject = Object.keys(simpleObject).reduce((result, key) => {
        if (key === 'userId') {
            result[key] = simpleObject[key];
        } else {
            result[key] = extractNumericValue(simpleObject[key]);
        }
        return result;
    }, {});
    
    
    let totalScore = 0;
    
    for (const key in trimmedObject) {
        if (key !== 'userId') {
            totalScore += parseFloat(trimmedObject[key]);
        }
    }
    
    // for (const key in trimmedObject) {
    //     if (key !== 'userId') {
    //         // Check if the property is not 'userId'
    //         totalScore += parseFloat(trimmedObject[key]);
    //     }
    // }
    trimmedObject.totalScore=totalScore;

    
    // console.log(trimmedObject);
    // console.log('Total Score: ', totalScore);
    
    const result=await TestData.create(trimmedObject);
    if(result){
        res.status(200).json(
            {
                status:"success",
                totalScore:totalScore
            }
        )
    }
})

exports.big5Record=catchAsync(async(req,res)=>{
    // console.log(req.body);
    const userId=req.body.userId;
    const data=req.body.data;

    const openness = parseInt(data.openness, 10);
    const consientiousness = parseInt(data.consientiousness, 10);
    const extraversion = parseInt(data.extraversion, 10);
    const agreeableness = parseInt(data.agreeableness, 10);
    const neuroticism = parseInt(data.neuroticism, 10);

    const big5Data = {
      userId,
      openness,
      consientiousness,
      extraversion,
      agreeableness,
      neuroticism,
    };
      
    const result=await Big5Data.create(big5Data);
    if(result){
        res.status(200).json(
            {
                status:"success"
            }
        )
    }
})