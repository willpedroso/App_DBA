function Calendario() {
    $('#calendarioAtividades').fullCalendar({
            header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,basicWeek,basicDay'
    },
    defaultDate: 'today',
    lang: 'pt-br',
    editable: false,
    eventLimit: true
        });
    }

