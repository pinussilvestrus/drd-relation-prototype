const views = {
    drd: { selector: "#view-drd" },
    'dt-season': { selector: "#view-dt-season" },
    'dt-holiday': { selector: "#view-dt-holiday" },
    'drd-relations': { selector: "#view-drd-relations" }
}

function switchView(viewId) {

    // make switched visible
    const newView = views[viewId];
    const node = $(newView.selector);
    node.css('visibility', 'visible');

    console.log(node);

    // make all others invisible
    Object.values(views).forEach(v => {
        if(v !== newView) {
            $(v.selector).css('visibility', 'hidden');
        }
    });
}

function toggleDRDHovers(val) {
    const node1 = $('.connection-outline-permanent');

    const node2 = $('.see-relations');

    node1.css('visibility', val);
    node2.css('visibility', val);
}

$(document).ready(function(){
    $('.to-dt-holiday').click(switchView.bind(this, 'dt-holiday'));
    $('.to-dt-season').click(switchView.bind(this, 'dt-season'));
    $('.to-drd').click(switchView.bind(this, 'drd'));
    
    $('.see-relations').click(function() {
        switchView('drd-relations');
        toggleDRDHovers('hidden');
    });

    $('#view-drd').click(function(e) {
        if (e.target !== this) {
            return;
        }

        toggleDRDHovers('hidden');
    });

    $('.connection').click(function() {
        toggleDRDHovers('visible');
    });
});