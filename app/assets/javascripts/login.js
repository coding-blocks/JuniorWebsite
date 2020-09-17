$(document).ready(function() {

    const domain = gon.online_cb_api
    let mobile_no
    let otpClaimId

    $("body").delegate(".link1", "click", function() {
        $('#mobileDetailsModal').modal('show')
    });

    $("body").delegate("#getOtpBtn", "click", async function() {

        if ($('#getOtpBtn').html() == 'Proceed') {
            mobile_no = $('#mobile_no').val()
            localStorage.setItem("userMobile", mobile_no)
            if (mobile_no.length != 10)
                return alert("Invalid number")

            try {
                const response = await axios.post(`${domain}/jwt/otp/v2`, {
                    'mobile': $('#mobile_no').val(),
                    'dialCode': '91'
                })
                otpClaimId = response.data['id']
                localStorage.setItem("otpClaimId", response.data['id'])

                $('.enter_otp').show()
                $('.enter_mobile').hide()
                $('#getOtpBtn').html('Verify Otp')
            } catch (err) {
                console.log(err)
                alert("Some Error Occured")
            }
        } else {
            let otp = $('#otp').val()
            if (!otp)
                return alert("Please enter otp to proceed!")

            try {
                const response = await axios.post(`${domain}/jwt/otp/v2/${otpClaimId}/verify`, {
                    'otp': otp,
                })
                $('#mobileDetailsModal').modal('hide')
            } catch (err) {
                let errorText = err.response.data.errors[0].title.split('_').join(' ')
                $('#mobileDetailsModal').modal('hide')
                errorText ? alert(errorText) : alert("OTP verification failed!")
                return
            }

            try {

                $(".se-pre-con").show();

                await axios.post(`${domain}/users/find`, {
                    'verifiedmobile': `+91-${mobile_no}`
                })

                const reqBody = {
                    "client": "junior_app"
                }

                const juniorStudentResponse = await axios.post(`${domain}/junior/otp/${otpClaimId}/login`,
                    Qs.stringify(reqBody), {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    })

                localStorage.setItem('jwt', juniorStudentResponse.data.jwt)
                window.location.href = "/users/profile"
            } catch (err) {
                window.location.href = "/users/add"
            }
        }

    })

})