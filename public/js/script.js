const views = {
    drd: { selector: "#view-drd" },
    'dt-season': { selector: "#view-dt-season" },
    'dt-holiday': { selector: "#view-dt-holiday" }
}


function switchView(viewId) {

    // make switched visible
    const newView = views[viewId];
    const node = $(newView.selector);
    node.css('visibility', 'visible');

    // make all others invisible
    Object.values(views).forEach(v => {
        if(v !== newView) {
            $(v.selector).css('visibility', 'hidden');
        }
    });
}

$(document).ready(function(){
    $('.to-dt-holiday').click(switchView.bind(this, 'dt-holiday'));
    $('.to-dt-season').click(switchView.bind(this, 'dt-season'));
    $('.to-drd').click(switchView.bind(this, 'drd'));

    $('#view-drd').click(function(e) {
        if (e.target !== this) {
            return;
        }

        $('.connection-outline-permanent').css('visibility', 'hidden');
        $('.see-relations').css('visibility', 'hidden');
    });

    $('.connection').click(function() {
        $('.connection-outline-permanent').css('visibility', 'visible');
        $('.see-relations').css('visibility', 'visible');
    });
});