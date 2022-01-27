localStorage.setItem('globID', 0)

function register() {
    const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    const ad = document.getElementById("ad").value;
    const soyad = document.getElementById("soyad").value;
    const email = document.getElementById("email").value;
    const nickname = document.getElementById("nickname").value;
    const password = document.getElementById("password").value;
    const ay = document.getElementById("ay").value;
    const gun = document.getElementById("gun").value;
    const il = document.getElementById("il").value;

    const datas = {
        ad: ad,
        soyad: soyad,
        email: email,
        nickname: nickname,
        password: password,
        ay: ay,
        gun: gun,
        il: il,
        cins: document.querySelector('input[name="rate"]:checked').value,
        photos: []
    }
    var hey = true;

    for (let i of users) {
            const ph = i.nickname
            const em = i.email
            if (ph == nickname || em == email) {
                hey = false
                alert("this nickname or email is taken")
                break
            }
        
    }
    if (hey) {
        users.push(datas);
        localStorage.setItem("users", JSON.stringify(users));
    }

}

function loginPressed() {

    const nickname = document.getElementById('nickname').value;
    const password = document.getElementById('password').value;


    if (nickname == "") {
        alert("you didnt fill everything");
    } else if (password == "") {
        alert("you didnt fill everything");
    }

    const users = JSON.parse(localStorage.getItem('users'));
    let counter = 0
    let index = -1;
    for (let i of users) {
        index++;
        if (nickname == i.nickname && password == i.password) {
            counter++
            localStorage.setItem('index', index);
            self.location = "homepage.html";
            return true;
        }
    }
    if(counter == 0){
        alert("couldn't find")
    }

}

function profilepressed() {
    self.location = "personalpage.html";


}

function writedown() {
    const index = localStorage.getItem('index');

    const users = JSON.parse(localStorage.getItem('users'));

    const obj = users[index];

    for (let i in obj) {
        document.getElementById('demo').innerHTML += ` ${i} : ${obj[i]} |`
    }
}


function imageUploaded() {
    let base64String = "";
    var file = document.querySelector(
        'input[type=file]')['files'][0];

    var reader = new FileReader();

    reader.onload = function () {
        base64String = reader.result

        // imageBase64Stringsep = base64String;

        photo(base64String)
    }
    reader.readAsDataURL(file);

}

function photo(base64) {

    var obj = {
        img: base64
    }

    const index = localStorage.getItem('index');

    const users = JSON.parse(localStorage.getItem('users'));

    const yes = users[index].photos;

    yes.push(obj)

    localStorage.setItem("users", JSON.stringify(users));

}

function doyou() {
    document.getElementById('upload').style.display = "inline-block"
}

function displayPhotos() {


    const users = JSON.parse(localStorage.getItem('users'));
    for (let i of users) {

        for (let j = 0; j < i.photos.length; j++) {
            var image = new Image();
            const ph = i.photos[j];
            const disp = ph.img;
            image.src = disp;
            document.getElementById("photos-middle").appendChild(image)
        }

    }

}

function logout() {
    self.location = "login.html";
}