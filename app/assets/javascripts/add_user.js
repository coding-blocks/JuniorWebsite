$(document).ready(function() {
    $('#user_mobile_no').val(localStorage.getItem('userMobile'))
    const domain = gon.ameoba_junior_student_domain

    $('.register-form').validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        rules: {
            email: {
                required: true,
                email: true
            },
            firstname: {
                required: true
            },
            lastname: {
                required: true
            },
            user_mobile_no: {
                required: true
            }
        },

        messages: {
            email: {
                required: "Email is required."
            },
            firstname: {
                required: "first name is required"
            },
            lastname: {
                required: "Last name is required"
            },
            user_mobile_no: {
                required: "Mobile no is required"
            }
        },

        invalidHandler: function(event, validator) { //display error alert on form submit
        },

        highlight: function(element) { // hightlight error inputs
            $(element)
                .closest('.form-group').addClass('has-error'); // set error class to the control group
        },

        success: function(label) {
            label.closest('.form-group').removeClass('has-error');
            label.remove();
        },

        errorPlacement: function(error, element) {
            error.insertAfter(element.closest('.input-icon'));
        }
    });

    $("body").delegate("#registerBtn", "click", async function() {
        if (!$('.register-form').validate().form()) {
            alert("Invalid Form!")
            return
        }

        try {
            const requestBody = {
                "username": `junior-${$('#user_mobile_no').val()}`,
                "mobile": `+91-${$('#user_mobile_no').val()}`,
                "firstname": $('#firstname').val(),
                "lastname": $('#lastname').val(),
                "email": $('#email').val(),
                "password": "password",
                "claimId": localStorage.getItem("otpClaimId"),
                "client": "junior_app"
            }

            const response = await axios.post(`${domain}/junior/users`,
                Qs.stringify(requestBody), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })

            alert("Registration Successful")
            window.location.href = "/users/course-choice"
        } catch (err) {
            console.log(err)
            alert("Error Occured while registration!")
        }
    })
})