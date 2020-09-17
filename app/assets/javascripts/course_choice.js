$(document).ready(function() {

    $('#submit_course_choice_btn').on('click', async function() {

        var preferredCourses = [];
        var rows = document.getElementsByTagName("table")[0].rows;
        $.each($("input:checkbox[name=course_choice]:checked"), function(){
            let course_id = $(this).closest('tr').attr('id')
            preferredCourses.push(parseInt(course_id))
        });

        const user = JSON.parse(localStorage.getItem('user'))

        if (!preferredCourses)
            return alert("Please choose a course")

        if (!user)
            return alert("Please login first!")

        axios.post(`/users/add_course_choice`, {
            'preferred_courses': preferredCourses,
            'user': user
        }).then((response) => {
            window.location.href = "/thankyou"
        }).catch((error)  => {
            alert("Some error occured!")
        })

    })
})
