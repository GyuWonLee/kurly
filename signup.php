<?
    $db_server = 'localhost';
    $db_user_name = 'dksuz';
    $db_user_pw = 'Gy9610gy*';
    $db_name = 'dksuz';


    $conn = mysqli_connect($db_server, $db_user_name, $db_user_pw, $db_name);
    mysqli_set_charset($conn, 'utf8');

    $id = 'gyuwon';
    $pw = '1234';
    $name = '규원';
    $email = 'gyuwon@naver.com';
    $hp = '010-1234-5678';
    $addr = '서울시 강남구 대치동';
    $gender = '여자';
    $birth = '1995-08-08';
    $chooga = '친구초대 추천인 아이디 dksuz';
    $service = '이용약관 동의(필수), 개인정보 수집∙이용 동의(필수)';

    $sql = "insert into week8_kurly_table(id, pw, name, email, hp, addr, gender, birth, chooga, service)
            values('$id', '$pw', '$name', '$email', '$hp', '$addr', '$gender', '$birth', '$chooga', '$service')";

    $result = mysqli_query($conn, $sql);

    if(!$result){
        echo "데이터저장실패";
    }
    else{
        echo "데이터저장성공";
    }

?>