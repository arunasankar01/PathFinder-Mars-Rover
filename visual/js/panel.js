/**
 * The control panel.
 */
var Panel = {
    init: function() {
        var $algo = $('#algorithm_panel');

        $('.panel').draggable();
        $('.accordion').accordion({
            collapsible: false,
        });
        $('.option_label').click(function() {
            $(this).prev().click();
        });
        $('#hide_instructions').click(function() {
            $('#instructions_panel').slideUp();
        });
        $('#play_panel').css({
            top: $algo.offset().top + $algo.outerHeight() + 20
        });
        $('#button2').attr('disabled', 'disabled');
    },
    /**
     * Get the user selected path-finder.
     * TODO: clean up this messy code.
     */
    getFinder: function() {
        var finder, selected_header, heuristic, allowDiagonal, trackRecursion, timeLimit;
        
        selected_header = $(
            '#algorithm_panel ' +
            '.ui-accordion-header[aria-selected=true]'
        ).attr('id');
        
        switch (selected_header) {

        case 'astar_header':
            allowDiagonal = typeof $('#astar_section ' +
                                     '.allow_diagonal:checked').val() !== 'undefined';
            
            
            heuristic = $('input[name=astar_heuristic]:checked').val();
            finder = new PF.AStarFinder({
                allowDiagonal: allowDiagonal,
                heuristic: PF.Heuristic[heuristic],
                
            });
            
            break;

        case 'breadthfirst_header':
            allowDiagonal = typeof $('#breadthfirst_section ' +
                                     '.allow_diagonal:checked').val() !== 'undefined';
            
            finder = new PF.BreadthFirstFinder({
                allowDiagonal: allowDiagonal,
                
                });
            
            break;

        case 'bestfirst_header':
            allowDiagonal = typeof $('#bestfirst_section ' +
                                     '.allow_diagonal:checked').val() !== 'undefined';
            
            heuristic = $('input[name=bestfirst_heuristic]:checked').val();
            
            finder = new PF.BestFirstFinder({
                allowDiagonal: allowDiagonal,
                heuristic: PF.Heuristic[heuristic]
            });
            
            break;

        case 'dijkstra_header':
            allowDiagonal = typeof $('#dijkstra_section ' +
                                     '.allow_diagonal:checked').val() !== 'undefined';
           
            finder = new PF.DijkstraFinder({
                allowDiagonal: allowDiagonal,
                
             });
            
            break;

               
    
        }

        return finder;
    }
};
