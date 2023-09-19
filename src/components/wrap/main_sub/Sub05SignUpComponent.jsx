import React from 'react';
import './scss/main_sub5_signup.scss';
import axios from 'axios';
import { ViewProductContext } from '../../context/ViewProductContext';

export default function Sub05SignUpComponent({회원가입}) {

    const {confrimModalOpen, timerStart, post, setPost } = React.useContext(ViewProductContext);


    const [state, setState] = React.useState(회원가입);

    const {
        isId, isIdDuplCheck, isPw1, isPw2, isName, isEmail, isEmailDuplCheck, isHp,isHpDis, isUserHpDis, isAddr1, isAddr2, isGender, isYear, 
        isMonth, isDate, isChooga1, isChooga2, isService, msgAddr1, msgAddr2, msgChooga1, 
        msgChooga2, msgDate, msgEmail, msgGender, msgHp, msgId, msgMoth, msgName, msgPw1, msgBirth, chooGaGuideText, chooGaPlaceHolder,
        msgPw2, msgService, msgYear, 아이디, 비밀번호, 비밀번호확인, 이름, 이메일, 휴대폰,성별,휴대폰인증발급번호, 휴대폰인증입력번호,
        생년, 생월, 생일,추천인아이디,추가입력사항, 이용약관, 이용약관동의, 체크비밀번호, 체크아이디중복, 체크이메일중복, 체크휴대폰인증
    } = state;

    const onChangeEvent=(e, z)=>{

       if(z==='아이디'){  // 6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합
            // const regexp1 = /(.){6,16}/g;   // 6 ~ 16 범위  테스트 정규표현식.test(입력값) true & false 검증
            const regexp2 = /([A-Za-z]+[0-9]*){6,16}/g;    // 영문 대소문자1자이상 +1자이상  숫자포함 *0자이상  ? 1자  ?? 2자
            let isId = false;
            let msgId = '';

            if( regexp2.test(e.target.value)===false ){
                isId = true; 
                msgId = "6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합";
            }
            else{
                isId = false; 
                msgId = "";
            }

            setState({
                ...state,
                아이디: e.target.value,
                isId: isId,
                msgId: msgId
            });
       }       
       else if(z==='비밀번호'){
            // 1. 최소 10자 이상 입력
            const regExp1 = /(.){10,}/g; // false 이면 오류
            // 2. 동일한 숫자 3개 이상 연속 사용 불가
            // const regExp2 = /(.)\1\1/g; // 문자 숫자 특수문자 .... 모둔 글자수 체크
            // const regExp2 = /([0-9])\1\1/g; // [0-9] === \d
            const regExp2 = /(\d)\1\1/g;  // Digit 숫자 // true 이면 오류

            // 3-1. (공백 제외)
            // 3-2. 영문/숫자/특수문자만(공백 제외) 허용하며, 2개 이상 조합
            // 조합1 영문+/숫자+ |
            // 조합2 영문/특수문자 |
            // 조합3 숫자/특수문자
            const regExp3 = /(\s)/g;  // \s 공백 Space // true 이면 오류
            const regExp4 = /([A-Za-z]+[0-9]+)+|([0-9]+[A-Za-z]+)+|([A-Za-z]+[`~!@#$%^&*()\-_=+|\\[\]{}'";:/?.>,<]+)+|([`~!@#$%^&*()\-_=+|\\[\]{}'";:/?.>,<]+[A-Za-z]+)+|([0-9]+[`~!@#$%^&*()\-_=+|\\[\]{}'";:/?.>,<]+)+|([`~!@#$%^&*()\-_=+|\\[\]{}'";:/?.>,<]+[0-9]+)+/g; // true
            

            let msgPw1 = '';
            let isPw1 = false;

            if( regExp1.test(e.target.value)===false ){
                msgPw1 = '최소 10자 이상 입력';
                isPw1 = true;
            }
            else if( regExp2.test(e.target.value)===true ){
                msgPw1 = '동일한 숫자 3개 이상 연속 사용 불가';
                isPw1 = true;
            }
            else if(  regExp3.test(e.target.value)===true || regExp4.test(e.target.value)===false ){
                msgPw1 = '영문/숫자/특수문자만(공백 제외) 허용하며, 2개 이상 조합';
                isPw1 = true;
            }
            else {
                msgPw1 = '';
                isPw1 = false;
            }


            setState({
                ...state,
                비밀번호: e.target.value,
                msgPw1: msgPw1,
                isPw1: isPw1
            });
       }
       else if(z==='비밀번호확인'){
            // 이전 입력 비밀번호와 일치
            let msgPw2 = '';
            let isPw2= false;

            if( 비밀번호!==e.target.value ){
                msgPw2 = '동일한 비밀번호를 입력';
                isPw2= true;
            }
            else{
                msgPw2 = '';
                isPw2= false;
                
            }
            setState({
                ...state,
                비밀번호확인: e.target.value,
                msgPw2: msgPw2,
                isPw2: isPw2,
                체크비밀번호:true
            });
       }       
       else if(z==='이름'){
        let msgName = '';
        let isName= false;

            if(e.target.value===""){
                msgName = '이름을 입력해 주세요.';
                isName= true;
            }
            else{
                msgName = '';
                isName= false;
            }
        
            setState({
                ...state,
                이름: e.target.value,
                msgName: msgName,
                isName: isName
            });
       }
       else if(z==='이메일'){
        // * 0자이상 다중문자
        // + 1자이상 다중문자
        // ? 0자 또는 1자 하나의 문자만

        // 사용불가 @ () [] <> \ " 공백 
        // 시작 ^([A-Za-z0-9`~!#$%^&*\-_=+|{}';:/?.,])
        // 끝 [A-Za-z]{2,3}$ 
        // [정상예시]
        // moon.jong@naver1234.com 테스트 OK
        // moonjong@naver1234.com 테스트 OK
        // moonjong@yaho_33o.co.kr 테스트 OK
        // moo_123njong@yahoo.co.kr 테스트 OK

        // [오류예시]
        // moo_123njong@yah()oo.co.kr 테스트 OK
        // moo[]_123njong@yah()oo.co.kr  테스트 OK
        // moonjong@yah()oo.co.kr 테스트 OK
        // moo njong@yahoocokr 테스트 OK
        // moo njong@yah ooco.kr 테스트 OK
        // moonjongyahoo.co.kr  테스트 OK
        const regExp = /^([A-Za-z]*|[0-9]*|[`~!#$%^&*\-_=+|{}';:/?.,]*)+@([A-Za-z]*|[0-9]*|[`~!#$%^&*\-_=+|{}';:/?.,]*)+\.[A-Za-z]{2,3}$/g;  // false 이면 오류
        // . 괄호밖에서는 반드시 이스케이프 문자처리 해야한다.  \.

        let msgEmail = '';
        let isEmail= false;

            if(regExp.test(e.target.value)===false){
                msgEmail = '이메일 형식으로 입력해 주세요.';
                isEmail= true;
            }
            else{
                msgEmail = '';
                isEmail= false;
            }
            setState({
                ...state,
                이메일: e.target.value,
                msgEmail: msgEmail,
                isEmail: isEmail 
            });
       }
       else if(z==='휴대폰'){
        // 1. 숫자만 입력 그외는 모두 입력과 동시에 삭제
        // 2. 11자까지 입력가능
            const regExp = /[^0-9]/g;  // true 이면 오류
            let msgHp = '';
            let isHp = false;
            let 휴대폰=''
            let isHpDis=false;
            // 숫자 제외 입력동시 삭제

            // 휴대폰 =  문자열.replace(정규표현식, '');
            휴대폰 =  e.target.value.replace(regExp, '');

            if(e.target.value===""){
                msgHp = '휴대폰 번호를 입력해 주세요.';
                isHp= false;
                isHpDis = false; // 버튼사용불가능
            }
            else{
                msgHp = '';
                isHp= true;
                isHpDis = true; //  버튼사용가능
            }

            setState({
                ...state,
                휴대폰: 휴대폰,
                msgHp: msgHp,
                isHp: isHp,
                isHpDis: isHpDis
            });
       }
       else if(z==='휴대폰인증입력번호'){
        setState({
            ...state,            
            휴대폰인증입력번호: e.target.value 
        });
       }

    }




    // 아이디 이메일 중복체크
    const onClickDuplCheck=(e, value)=>{
        e.preventDefault();

        if(value==='ID중복확인'){
            
            // 데이터베이스 아이디 sql 처리 중복검사 리턴 중복여부
            // 중복이면 -1을 리턴 아니면 1을 리턴
            // 닷홈 웹서버에 php sql 작성 데이터베이스 연동 처리한다.

            let newFormData = new FormData();
            newFormData.append('id', 아이디);

            axios({
                url:'https://www.gyuwon.net/kurly/id_duplicate_check.php',
                method:'post',
                data: newFormData
            })
            .then((res) => {

                console.log('아이디중복체크');
                console.log( res );
                console.log( res.data );

                if(res.status===200){
                    if(res.data!==1){
                        setState({
                            ...state,
                            isIdDuplCheck: true,
                            체크아이디중복: true
                        })   
                        confrimModalOpen('사용 가능한 아이디입니다.', 1);
                    }
                    else{
                        confrimModalOpen('사용 불가능한 아이디입니다.');     
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });

        }
        else if(value==='EMAIL중복확인'){
            
            
            // 데이터베이스 아이디 sql 처리 중복검사 리턴 중복여부
            // 중복이면 -1을 리턴 아니면 1을 리턴
            // 닷홈 웹서버에 php sql 작성 데이터베이스 연동 처리한다.

            let newFormData = new FormData();
            newFormData.append('email', 이메일);

            axios({
                url:'https://www.gyuwon.net/kurly/email_duplicate_check.php',
                method:'post',
                data: newFormData
            })
            .then((res) => {
                if(res.status===200){
                    if(res.data!==1){
                        setState({
                            ...state,
                            isIdDuplCheck: true,
                            체크이메일중복: true
                        })   
                        confrimModalOpen('사용 가능한 이메일입니다.', 1);
                    }
                    else{
                        confrimModalOpen('사용 불가능한 이메일입니다.');     
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }

    // 휴대폰 인증번호 받기 버튼 클릭 이벤트
    // 입력된 휴대폰 번호 유효성 검증 01079425305  010~9 
    // 인증번호 생성 그리고 보내기
    // 010  ~ 019  01079425305  01179425305  01279425305  01379425305 01479425305 01579425305 01779425305 01979425305
    // 000  or 0000
    // 0000
    // 맨앞3자리, 중간 3,4자리, 끝 4자리 숫자
    const onClickHpBtn=(e)=>{
        e.preventDefault();

        if(isUserHpDis===true){ // 다른번호인증 
            setState({
                ...state,
                isUserHpDis: false,
                휴대폰: '',
                휴대폰인증입력번호: ''
            });
        }
        else{ // 인증번호받기
            let regExp = /^01[0-9]{1}[0-9]{3,4}[0-9]{4}$/g;
            let 휴대폰인증발급번호 = null; // 휴대폰 인증번호
    
            if(regExp.test(휴대폰)===false){
                confrimModalOpen('잘못된 휴대폰 번호입니다. 확인 후 다시 시도해주세요', 1);
            }
            else{
                // 인증번호 6자리 숫자로 생성
                휴대폰인증발급번호 = Math.floor(Math.random() * 900000) + 100000;
                confrimModalOpen(휴대폰인증발급번호 + '\n' + '지금 전송된 인증번호를 입력해주세요', 1);
            }
    
            setState({
                ...state,
                휴대폰인증발급번호: 휴대폰인증발급번호
            });
        }
       
    }
        
    
    // 인증번호확인 버튼 클릭 이벤트
    const onClickAuthenOk=(e)=>{
        e.preventDefault();
        // 입력된 인증번호 입력상자와 발급된 인증번호(상태관리변수) 비교
        if(휴대폰인증발급번호===Number(휴대폰인증입력번호)){           
            confrimModalOpen('인증에 성공 하였습니다.', 1);
            setState({
                ...state,
                isUserHpDis: true,
                휴대폰인증발급번호: '',
                체크휴대폰인증: true
            })
        }
        else{
            confrimModalOpen('잘못된 인증코드 입니다.', 1);
        }
    }


    
    // 3분 타이머 카운트 
    const [timer, setTimer] = React.useState({
        분:0,
        초:0
    });

     // 휴대폰 인증번호생성 & 입력대기 카운트 타이머 3분
    // 인증번호 성공하면 인증번호 입력상자 버튼 숨기고
    // 인증번호 발급[인증번호받기] 버튼이 다른번호 인증으로 변경
    // 입력상자는 입력불가 상태로 변경

    //  주소1
    const onChangeAddr1Event=(e)=>{
        setPost({
            ...post,
            주소1: e.target.value
        })
    }

    //  주소2
    const onChangeAddr2Event=(e)=>{
        setPost({
            ...post,
            주소2: e.target.value
        })        
    }

    // 주소검색
    const onClickAddress=(e)=>{
        e.preventDefault();
        setPost({
            ...post,
            isPostCode: true
        })
    }

    // 성별 체크 라디오 버튼 이벤트
    const onChangeGender=(e)=>{
        setState({
            ...state, 
            성별: e.target.value
        })
    }

    // 생년월일
    // 생년 1923~2023
    // 1. 생년 > 올해년도-100  100세이하 생년월일을 다시 확인해주세요.
    // 2. 생년 > 올해년도  미래년도 생년월일이 미래로 입력 되었습니다.
    // 3. 생년 <= (올해년도-14) 14세미만 만 14세 미만은 가입이 불가합니다.
    //    예] 2009 <= 2023-14 
    // 생월 1 12
    // 생일 1 31
    const onChangeBirthYear=(e)=>{
        setState({
            ...state,
            생년: e.target.value
        })
    }
    const onChangeBirthMonth=(e)=>{
        setState({
            ...state,
            생월: e.target.value
        })

    }
    const onChangeBirthDate=(e)=>{
        setState({
            ...state,
            생일: e.target.value
        })
    }

    React.useEffect(()=>{

        // 세개의 모든 입력값이 없다면 => 하단에 오류메시지 모두 삭제
        if(생년==='' && 생월==='' && 생일===''){
            setState({
                ...state,
                msgBirth:''
            })
            return;
        }
        else{
            if(생년===''){
                setState({
                    ...state,
                    msgBirth: '태어난 년도 4자리를 정확하게 입력해주세요' 
                })
            }   
            else{
                if(Number(생년) < new Date().getFullYear()-100){
                    setState({
                        ...state,
                        msgBirth: '생년월일을 다시 확인해주세요(100세 이하 가능)' 
                    }) 
                }
                else if(Number(생년) > new Date().getFullYear()){
                    setState({
                        ...state,
                        msgBirth: '미래년도는 가입이 불가합니다.' 
                    })   
                }                
                else if(Number(생년) >= new Date().getFullYear()-14){
                    setState({
                        ...state,
                        msgBirth: '만 14세 미만은 가입이 불가합니다.' 
                    })    
                }
                else{
                    if( 생월 === '' ){
                         setState({
                            ...state,
                            msgBirth: '생월을 입력하세요' 
                        })   
                    }
                    else if( Number(생월) < 1 || Number(생월) > 12 ){
                        setState({
                            ...state,
                            msgBirth: '생월을 입력하세요' 
                        })   
                    }
                    else{
                        if( 생일 === '' ){
                            setState({
                               ...state,
                               msgBirth: '생일을 입력하세요' 
                           })   
                       }
                       else if( Number(생일) < 1 || Number(생일) > 31 ){
                           setState({
                               ...state,
                               msgBirth: '생일을 입력하세요' 
                           })   
                       }
                       else{
                            setState({
                                ...state,
                                msgBirth: '' 
                            })  
                       }
                    }
                }
            }
        }


    },[생년, 생월, 생일]);

    // 추가입력사항
    const onChangeChooga=(e)=>{
        // 라디오버튼을 체크하면 그값을 placeholder에 적용
        let chooGaGuideText ='';
        let chooGaPlaceHolder = '';

        if(e.target.value==='친구초대 추천인 아이디'){
            chooGaGuideText = '가입 후 7일 내  배송완료 시, 친구초대 이벤트 적립금이 지급됩니다.';
            chooGaPlaceHolder ='추천인 아이디를 입력해 주세요.';
        }
        else{
            chooGaGuideText = `추천인 아이디와 참여 이벤트명 중 하나만 선택 가능합니다. 가입 이후는 수정이 불가능 합니다. 대소문자 및 띄어쓰기에 유의해주세요.`;
            chooGaPlaceHolder ='참여 이벤트명을 입력해 주세요.';
        }

        setState({
            ...state,
            추가입력사항: e.target.value,
            chooGaGuideText: chooGaGuideText,
            chooGaPlaceHolder: chooGaPlaceHolder
        })
    }

    //  추천인 아이디
    const onChangeChooChunEvent=(e)=>{
        setState({
            ...state,
            추천인아이디: e.target.value
        }) 
    }
    const onClickChooChunIdOk=(e)=>{
        e.preventDefault();
        // db 데이터와 확인
       

 
            // 데이터베이스 아이디 sql 처리 중복검사 리턴 중복여부
            // 중복이면 -1을 리턴 아니면 1을 리턴
            // 닷홈 웹서버에 php sql 작성 데이터베이스 연동 처리한다.

            let newFormData = new FormData();
            newFormData.append('id', 추천인아이디);

            axios({
                url:'https://www.gyuwon.net/kurly/id_duplicate_check.php',
                method:'post',
                data: newFormData
            })
            .then((res) => {
                if(res.status===200){
                    if(res.data===1){
                        setState({
                            ...state,
                            추천인아이디존재: true
                        })   
                        confrimModalOpen('존재하는 아이디 입니다 친구초대 이벤트에 참여 가능해요.');
                    }
                    else{
                        confrimModalOpen('존재하지 않은 아이디입니다.');     
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });


    }
    
    // 이용약관동의
    // 전체동의
    // 전체체크 이벤트
    const onChangeAllCheck=(e)=>{
        if(e.target.checked){
            setState({
                ...state,
                이용약관동의: 이용약관
            })
        }
        else{
            setState({
                ...state,
                이용약관동의: []
            })
        }


    }

    // 개별체크 이벤트
    const onChangeCheck=(e)=>{
       if(e.target.checked){
            setState({
                ...state,
                이용약관동의: [...이용약관동의, e.target.value]
            }) 
       }
       else{
            // 필터: 선택 취소된 내용만 제외하고 나머지는 그대로 저장
            setState({
                ...state,
                이용약관동의: 이용약관동의.filter((item)=>item !== e.target.value)
            }) 
       } 
    }

    // 폼데이터 웹서버에 전송 
    const onSubmitSignup=(e)=>{
        e.preventDefault();
        // post 전송시
        // 폼데이터를 axios를 이용 
        // 전송시에는 폼데이터를 폼데이터를 생성하고  new FormData()
        // 전송한다.
        // 유효성 검사

        // 1-1. 아이디 빈칸 체크   
        // 1-2. 아이디 중복 체크

        // 2-1. 비밀번호1 체크
        // 2-2. 비밀번호2 체크

        // 3. 이름 빈칸 체크

        // 4-1. 이메일 빈칸 체크
        // 4-2. 이메일 중복 체크

        // 5-1. 휴대폰 빈칸 체크
        // 5-2. 휴대폰 인증 체크

        // 6-1. 주소1 빈칸 체크
        // 6-2. 주소1 빈칸 체크

        // 추천인 아이디 기능 추가

        // 7    필수 이용약관동의 3개 체크
        let 이용약관동의필수 = 0;
        let result = 이용약관동의.map((item)=> item.includes('필수') ? 1 : 0 );

        result.map((item)=>{
            이용약관동의필수 += item;
        })

        if( 아이디==='' ){
            confrimModalOpen('아이디를 입력 해주세요.');
        }
        else if( 체크아이디중복===false ){
            confrimModalOpen('아이디 중복확인을 해주세요.');
        }
        else if( 비밀번호==='' ){
            confrimModalOpen('비밀번호를 입력 해주세요.');
        }
        else if( 체크비밀번호===false ){
            confrimModalOpen('한번더 비밀번호를 입력 해주세요.');
        }
        else if( 이름==='' ){
            confrimModalOpen('이름을 입력 해주세요.');
        }
        else if( 이메일==='' ){
            confrimModalOpen('이메일을 입력 해주세요.');
        }
        else if( 체크이메일중복===false ){
            confrimModalOpen('이메일 중복확인을 해주세요.');
        }
        else if( 휴대폰==='' ){
            confrimModalOpen('휴대폰을 입력 해주세요.');
        }
        else if( 체크휴대폰인증===false ){
            confrimModalOpen('휴대폰인증체크를 해주세요.');
        }
        else if( post.주소1==='' ){
            confrimModalOpen('주소1을 입력 해주세요.');
        }
        else if( post.주소2==='' ){
            confrimModalOpen('주소2를 입력 해주세요.');
        }
        else if( 이용약관동의필수<3 ){
            confrimModalOpen('이용약관동의 필수항목을 선택 해주세요.');
        }
        else {  // 모든 조건 만족시 전송

            let 이용약관동의텍스트 = JSON.stringify(이용약관동의);
            let newFormData = new FormData();
    
            newFormData.append('id', 아이디);
            newFormData.append('pw', 비밀번호);
            newFormData.append('name', 이름);
            newFormData.append('email', 이메일);
            newFormData.append('hp', 휴대폰);
            newFormData.append('addr', `${post.주소1} ${post.주소2}`);
            newFormData.append('gender', 성별);
            newFormData.append('birth', `${생년}-${생월}-${생일}`);
            newFormData.append('chooga', `${추가입력사항} ${추천인아이디}`);
            newFormData.append('service', 이용약관동의텍스트 ); // 배열 문자열로 변환
    
            axios({
                url:'https://www.gyuwon.net/kurly/signup.php',
                method: 'POST',
                data: newFormData
            })
            .then((res)=>{
                
                console.log( res );
                if(res.status===200){
                    window.location.pathname = '/kurly';
                }
    
            })
            .catch(()=>{
    
            });
        }

        

    }

    return (
        <main id='mainSub05'>
            <section id="signUp">
                <div className="container">

                    <div className="title">
                        <h2>회원가입</h2>
                    </div>
                    <form onSubmit={onSubmitSignup} name='signup' id='signup' method='post'>
                        <div className="content">                        
                            <ul>
                                <li className="row1">
                                    <div className='box1'>
                                        <label htmlFor="userId">아이디<i>*</i></label>
                                        <input type="text" name='userId' id='userId' maxLength={16} onChange={(e)=>onChangeEvent(e, '아이디')} value={아이디} placeholder='아이디를 입력해주세요'/>
                                        <button onClick={(e)=>onClickDuplCheck(e,'ID중복확인')}>중복확인</button>
                                    </div>
                                    <div className='box2'>
                                        {isId && <p>{msgId}</p>}
                                    </div>
                                </li>
                                <li className="row2">
                                    <div className='box1'>
                                        <label htmlFor="userPw1">비밀번호<i>*</i></label>
                                        <input type="password" name='userPw1' id='userPw1' maxLength={16} onChange={(e)=>onChangeEvent(e, '비밀번호')} value={비밀번호} placeholder='비밀번호를 입력해주세요'/>                                    
                                    </div>
                                    <div className='box2'>
                                        {isPw1 && <p>{msgPw1}</p>}
                                    </div>
                                </li>
                                <li className="row3">
                                    <div className='box1'>
                                        <label htmlFor="userPw2">비밀번호확인<i>*</i></label>
                                        <input type="password" name='userPw2' id='userPw2' maxLength={16} onChange={(e)=>onChangeEvent(e, '비밀번호확인')} value={비밀번호확인} placeholder='비밀번호를 한번더 입력해주세요'/>                                    
                                    </div>
                                    <div className='box2'>
                                    {isPw2 && <p>{msgPw2}</p>}
                                    </div>
                                </li>
                                <li className="row4">
                                    <div className='box1'>
                                        <label htmlFor="userName">이름<i>*</i></label>
                                        <input type="text" name='userName' id='userName' maxLength={30} onChange={(e)=>onChangeEvent(e, '이름')}  value={이름} placeholder='이름을 입력해주세요'/>
                                    </div>
                                    <div className='box2'>
                                    {isName && <p>{msgName}</p>}
                                    </div>
                                </li>
                                <li className="row5">
                                    <div className='box1'>
                                        <label htmlFor="userEmail">이메일<i>*</i></label>
                                            <input type="email" name='userEmail' id='userEmail' onChange={(e)=>onChangeEvent(e, '이메일')} value={이메일} placeholder='이메일을 입력해주세요'/>
                                        <button onClick={(e)=>onClickDuplCheck(e,'EMAIL중복확인')}>중복확인</button>
                                    </div>
                                    <div className='box2'>
                                        {isEmail && <p>{msgEmail}</p>}
                                    </div>                            
                                </li>
                                <li className="row6">
                                    <div className='box1'>
                                        <label htmlFor="userHp">휴대폰<i>*</i></label>
                                        <input type="text" disabled={isUserHpDis} name='userHp' id='userHp' maxLength={11} onChange={(e)=>onChangeEvent(e, '휴대폰')} value={휴대폰} placeholder='숫자만 입력해주세요'/>
                                        <button disabled={!isHpDis} className={isHp?'':'hp-btn'} onClick={onClickHpBtn}>{isUserHpDis ? '다른번호 인증' : '인증번호받기'}</button>
                                    </div>
                                    <div className='box2'>
                                    {isHp && <p>{msgHp}</p>}
                                    </div>                                
                                </li>
                                {
                                    휴대폰인증발급번호!=='' && (
                                        <li className="row7">
                                            <div className='box1'>                                 
                                                <input type="text" name='userHpAu' id='userHpAu' maxLength={6} onChange={(e)=>onChangeEvent(e, '휴대폰인증입력번호')} value={휴대폰인증입력번호} placeholder='숫자만 입력해주세요'/>
                                                {timerStart && <span className='count-timer'><em>{timer.분<10?`0${timer.분}`:timer.분}</em><i>:</i><em>{timer.초<10?`0${timer.초}`:timer.초}</em></span>}
                                                <button onClick={onClickAuthenOk}>인증번호확인</button>
                                            </div>
                                            <div className='box2'>
                                            <p className='black'>인증번호가 오지 않는다면, 통신사 스팸 차단 서비스 혹은 휴대폰 번호 차단 여부를 확인해주세요. (컬리 1644-1107)</p>
                                            </div>    
                                        </li>
                                    )
                                }

                                <li className="row8">
                                    <div className='box1'>
                                        <label htmlFor="userHp">주소<i>*</i></label>
                                        {
                                            post.주소1!=='' && <input type="text" name='userAddr1' id='userAddr1' maxLength={250} onChange={onChangeAddr1Event} value={post.주소1} placeholder='검색주소'/>
                                        }
                                        <button onClick={onClickAddress}  className={post.주소1===''?'on':''}>{post.주소1!==''?"재검색":"주소검색"}</button>
                                    
                                    </div>
                                </li>
                                {
                                    post.주소1!=='' &&  
                                    (<li className="row9">
                                        <div className='box1'>
                                        <input type="text" name='userAddr2' id='userAddr2' maxLength={250} onChange={onChangeAddr2Event} value={post.주소2} placeholder='나머지주소를 입력하세요'/>
                                        </div>
                                    </li>)
                                }
                                <li className="row10">                                
                                    <div className='box2'>
                                        <p className='black'>
                                            {post.주소1!=='' && <strong>샛별배송</strong>}
                                            배송지에 따라 상품 정보가 달라질 수 있습니다.
                                        </p>
                                    </div>
                                </li>
                                <li className="row11">
                                    <div className='box1'>
                                        <label>성별</label>
                                        <div className='gender'>
                                            <label><input type="radio" onChange={onChangeGender} checked={성별.includes('남자')} name='male' id='male' value="남자"/><em>남자</em></label>
                                            <label><input type="radio" onChange={onChangeGender} checked={성별.includes('여자')} name='feMale' id='feMale' value="여자"/><em>여자</em></label>
                                            <label><input type="radio" onChange={onChangeGender} checked={성별.includes('선택안함')} name='none' id='none' value="선택안함"/><em>선택안함</em></label>
                                        </div>
                                    </div>                                
                                </li>
                                <li className="row12">
                                    <div className='box1'>
                                        <label>생년월일</label>
                                        <div className='birth'>
                                            <label><input type="text" onChange={onChangeBirthYear}   name='year' id='year' value={생년} placeholder='YYYY'/></label><i>/</i>
                                            <label><input type="text" onChange={onChangeBirthMonth}  name='month' id='month' value={생월} placeholder='MM'/></label><i>/</i>
                                            <label><input type="text" onChange={onChangeBirthDate}   name='date' id='date'  value={생일}  placeholder='DD'/></label>
                                        </div>
                                    </div>
                                    <div className='box2'>
                                        {<p>{msgBirth}</p>}
                                    
                                    </div>
                                </li>
                                <li className="row13">
                                    <div className='box1'>
                                        <label>추가입력사항</label>
                                        <div className='gender'>
                                            <label><input type="radio" name='chooChunin' id='chooChunin' value="친구초대 추천인 아이디" onChange={onChangeChooga}  checked={추가입력사항.includes("친구초대 추천인 아이디")}   /><em>친구초대 추천인 아이디</em></label>
                                            <label><input type="radio" name='event' id='event' value="참여 이벤트명" onChange={onChangeChooga}  checked={추가입력사항.includes("참여 이벤트명")} /><em>참여 이벤트명</em></label>                                        
                                        </div>
                                    </div>  
                                </li>
                                {
                                추가입력사항 !=='' && (
                                    <>
                                            <li className="row14">
                                                <div className='box1'>
                                                    <input type="text" name='userChooChun' id='userChooChun' maxLength={16} onChange={onChangeChooChunEvent} value={추천인아이디} placeholder={chooGaPlaceHolder}/>
                                                    <button onClick={onClickChooChunIdOk}>아이디 확인</button>
                                                </div>
                                            </li>
                                            <li className="row15">
                                                <div className='box2'>
                                                    <p className='black'>{chooGaGuideText}</p>
                                                </div>
                                            </li>
                                        </>  
                                    )
                                }

                                <li className="row16">
                                    <div className='box1'>
                                        <label>이용약관동의<i>*</i></label>
                                        <div className='service'>
                                            {/* <label><input type="checkbox" name='chkAll' id='chkAll' onChange={onChangeAllCheck} value="전체 동의합니다" checked={이용약관동의.length===7?true:false} />전체 동의합니다</label>                                         */}
                                            <label><input type="checkbox" name='chkAll' id='chkAll' onChange={onChangeAllCheck} value="전체 동의합니다" checked={이용약관동의.length===7} />전체 동의합니다</label>                                        
                                        </div>
                                    </div>  
                                    <div className='box2 service'>
                                        <p className='black'>
                                            선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다.
                                        </p>
                                    </div>
                                </li>
                                <li className="row17">
                                    <div className='box1'>
                                        <div className='service'>
                                            <label><input type="checkbox" name='chk1' id='chk1' onChange={onChangeCheck}  value="이용약관 동의(필수)" checked={이용약관동의.includes('이용약관 동의(필수)')} />이용약관 동의</label><span>필수</span>
                                            <a href="!#">약관보기</a>
                                        </div>
                                    </div>  
                                </li>
                                <li className="row18">
                                    <div className='box1'>
                                        <div className='service'>
                                            <label><input type="checkbox" name='chk2' id='chk2' onChange={onChangeCheck}  value="개인정보 수집∙이용 동의(필수)" checked={이용약관동의.includes('개인정보 수집∙이용 동의(필수)')}/>개인정보 수집∙이용 동의</label><span>필수</span>
                                            <a href="!#">약관보기</a>
                                        </div>
                                    </div>  
                                </li>
                                <li className="row19">
                                <div className='box1'>
                                    <div className='service'>
                                            <label><input type="checkbox" name='chk3' id='chk3' onChange={onChangeCheck}  value="개인정보 수집∙이용 동의(선택)"  checked={이용약관동의.includes('개인정보 수집∙이용 동의(선택)')}/>개인정보 수집∙이용 동의</label><span>선택</span>
                                            <a href="!#">약관보기</a>
                                        </div>
                                    </div>  
                                </li>
                                <li className="row20">
                                    <div className='box1'>
                                        <div className='service'>
                                            <label><input type="checkbox" name='chk4' id='chk4' onChange={onChangeCheck}  value="무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)"  checked={이용약관동의.includes('무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)')} />무료배송, 할인쿠폰 등 혜택/정보 수신 동의</label><span>선택</span>
                                        </div>
                                    </div>  
                                </li>
                                <li className="row21">
                                    <div className='box1'>
                                        <div className='service sms'>
                                            <label><input type="checkbox" name='chk5' id='chk5' onChange={onChangeCheck}  value="SMS(선택)"   checked={이용약관동의.includes('SMS(선택)')} />SMS</label>
                                            <label><input type="checkbox" name='chk6' id='chk6' onChange={onChangeCheck}  value="이메일(선택)"   checked={이용약관동의.includes('이메일(선택)')}/>이메일</label>
                                        </div>
                                    </div>
                                    <div className='box2 service sms'>
                                        <p className='black'>동의 시 한 달간 [5%적립] + [2만원 이상 무료배송] 첫 주문 후 안내</p>  
                                    </div>
                                    
                                </li>
                                <li className="row22">
                                    <div className='box1'>
                                        <div className='service'>
                                            <label><input type="checkbox" name='chk7' id='chk7' onChange={onChangeCheck}   value="본인은 만 14세 이상입니다.(필수)"  checked={이용약관동의.includes('본인은 만 14세 이상입니다.(필수)')}  />본인은 만 14세 이상입니다.</label><span>필수</span>
                                        </div>
                                    </div> 
                                </li>                            
                            </ul>
                        </div>
                        <div className="button-box">
                            <button type='submit'>가입하기</button>
                        </div>
                    </form>
                </div>
            </section>           
        </main>
    );
};

Sub05SignUpComponent.defaultProps = {
    회원가입 : {
        아이디: '',
        isId: false,
        msgId: '',
        isIdDuplCheck: false,

        비밀번호: '',
        isPw1: false,
        msgPw1: '',

        비밀번호확인: '',
        isPw2: false,
        msgPw2: '',

        이름: '',
        isName: false,
        msgName: '',

        이메일: '',
        isEmail: false,
        msgEmail: '',
        isEmailDuplCheck: false,

        휴대폰: '',
        휴대폰인증발급번호:'',
        휴대폰인증입력번호:'',        
        isHp: false,
        msgHp: '',
        isHpDis: false,
        isUserHpDis: false,

        주소1: '',
        isAddr1: false,
        msgAddr1: '',

        주소2: '',
        isAddr2: false,
        msgAddr2: '',

        성별: '선택안함',
        isGender: false,
        msgGender: '',

        생년: '',
        생월: '',
        생일: '',
        msgBirth:'',

        추가입력사항: '',        
        추천인아이디: '',    
        추천인아이디존재:false,    
        isChooga1: false,
        msgChooga1: '',
        chooGaGuideText:'',
        chooGaPlaceHolder:'',

        참여이벤트명:'',
        isChooga2: false,
        msgChooga2: '',

        이용약관: [
           "이용약관 동의(필수)",
           "개인정보 수집∙이용 동의(필수)",
           "개인정보 수집∙이용 동의(선택)",
           "무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)",
           "SMS(선택)",
           "이메일(선택)",
           "본인은 만 14세 이상입니다.(필수)"
        ],
        이용약관동의: [],
        isService: false,        
        msgService: '',
        체크비밀번호: false,
        체크아이디중복: false,
        체크이메일중복: false,
        체크휴대폰인증: false,

     }
}