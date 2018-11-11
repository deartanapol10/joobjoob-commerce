$(document).ready(() => {
    $('.delete-article').on('click', (e) => {
        $target = $(e.target);
        const id = $target.attr('data-id');
        console.log(id);
        $.ajax({
            type: 'DELETE',
            url: '/orders/'+id,
            success: (response) => {
                alert('Order is deleted !');
                window.location.href='/';
            },
            error: (err) => {
                console.log(err);
            }
        });
    });
});
