// Gửi thông tin sendInformation

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("sendInformation").addEventListener("click", function () {
        let provinceId = document.getElementById("selectProvinces").value;
        let districtId = document.getElementById("selectDistricts").value;
        let villageId = document.getElementById("selectVillages").value;

        // Lấy tên từ các đối tượng provinces, districts, villages
        let provinceName = provinces.find(province => province.code == provinceId)?.name || "Không có tỉnh";
        let districtName = districts.find(district => district.code == districtId)?.name || "Không có huyện";
        let villageName = villages.find(village => village.code == villageId)?.name || "Không có xã";

        // Gộp chúng lại thành chuỗi
        let addressWithId = `${villageName},${districtName},${provinceName}`;

        console.log(addressWithId)
        var data = {
            username: document.getElementById("username").value,
            phonenumber: document.getElementById("phonenumber").value,
            addresswithid: addressWithId,
            address: document.getElementById("address").value,
            gmail: document.getElementById("gmail").value,
            note: document.getElementById("note").value

        };
        fetch("https://script.google.com/macros/s/AKfycbz9RzNrWFiICHcXArwzfEx1tL3gGKWxaQO9oV5c0xTaSCufhqLfmEjGaqEFZcUF8AYq/exec", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            mode: "no-cors"
        })
            .then(data => {
                // Dữ liệu từ phản hồi
                console.log("Dữ liệu đã được ghi vào Google Sheets!");
            })
            .catch(error => console.error("Lỗi:", error));
        fetch("https://api.allorigins.win/raw?url=" + encodeURIComponent("https://script.google.com/macros/s/AKfycbwRFQkcPfmNRWg8u6LlWR1RF47met2CNKRerfOGrbXcvwsRipp8wCicQB7r6BFY3beQ/exec"), {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.text())  // Đọc phản hồi dưới dạng văn bản
            .then(text => {
                console.log("Phản hồi là:", text);  // Kiểm tra nội dung trả về
                try {
                    const data = JSON.parse(text);  // Chuyển đổi thành JSON thủ công

                    data.lastRowData.forEach((item, index) => {
                        console.log(`Dòng ${index + 1}:`, item);
                    });
                    //console.log("Dữ liệu dòng cuối cùng:", data.lastRowData.username);
                } catch (error) {
                    console.error("Lỗi chuyển đổi JSON:", error);
                }
            })
            .catch(error => console.error("Lỗi:", error));
        emailjs.init({
            publicKey: "Tc2kNkSvlVc0ol4fa",
        });
        ;
        let params = {
            subject: "Tesst  thử coi được không",
            name: "test",
            email: "heocontobeo@gmail.com",
            message: ""
        }
        emailjs.send("service_c3zzle8", "template_sg0y79l", params)
            .then(
                console.log("Gui roi")
            )
    });
});
