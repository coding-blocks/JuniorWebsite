$(document).ready(function() {

    function decodeJwt(token) {
        const userDetails = JSON.parse(atob(token.split('.')[1]));
        localStorage.setItem('user', JSON.stringify(userDetails));
        return userDetails
    }

    function fillUserProfile(user, courses) {
        $('#username').text(user.username)
        $('#firstname').text(user.firstname)
        $('#lastname').text(user.lastname)
        $('#email').text(user.email)
        
    }

    let jwt_token = localStorage.getItem('jwt')
    let userData = decodeJwt(jwt_token);
    fillUserProfile(userData)
    try {
        axios.get(`/users/details`, {
            params: {
                oneauth_id: userData.oneauth_id
            }
        }).then((response) => {
            preferredCourses = response.data.course_choices.map(c => c.name).join()
            $('#course_choices').text(preferredCourses)
        })
    } catch (err) {
        alert("some error occured!")
    }
})