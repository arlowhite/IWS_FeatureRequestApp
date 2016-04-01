
var demoRequestsData = [{
    title: ko.observable("Example request"),
    descr: ko.observable('An example request'),
    ticketUrl: ko.observable('https://foo.com'),
    client: ko.observable("Client A"),
    priority: ko.observable(1),
    targetDate: ko.observable(new Date()),
    productArea: ko.observable('Claims')
}];

// Models need to be created as functions so computed can initialize properly
function AppViewModel() {
    var self = this;
    self.requests = ko.observableArray(demoRequestsData);
    
    self.clients = ko.observableArray(['Client A', 'Client B', 'Client C']);
    
    self.currentClient = ko.observable('Client A');

    self.selectClient = function (client) {
      self.currentClient(client);
    };

    self.currentClientRequests = ko.pureComputed(function () {
        var client = self.currentClient();
        var requests = ko.utils.arrayFilter(self.requests(), function (req) {
            return req.client() === client;
        });
        requests.sort(function (a, b) {
            return a.priority() - b.priority();
        });
        return requests;
    }, self);
}

var viewModel = new AppViewModel();

// TODO use KO component instead of nested model object?
function CreateRequestForm() {
    var self = this;
    // text fields
    self.fields = ['title', 'descr', 'ticketUrl', 'client', 'productArea'];

    self.modalElement = $('#new-request-modal');
    self.modalElement.on('shown.bs.modal', function () {
        $('#title-input').focus();
        // Set Client to current Client on main screen initially
        $('#client-select').val(viewModel.currentClient());
    });

    self.selectedClient = ko.observable('');

    /**
     * The next available priority value (maximum priority allowed)
     */
    self.maxPriority = ko.pureComputed(function () {
        var selectedClient = self.selectedClient();
        var max = 0;
        $.each(viewModel.requests(), function (i, req) {
           if (req.client() === selectedClient) {
               var priority = req.priority();
               if (priority > max) {
                   max = priority;
               }
           }
        });
        return max + 1;
    });

    self.maxPriority.subscribe(function (newValue) {
        $('#priority-input').val(newValue);
    });

    self.createRequest = function(formElement) {
        var data = {};
        for (var i=0; i < self.fields.length; i++) {
            var f = self.fields[i];
            data[f] = ko.observable(formElement[f].value);
        }
        // https://bootstrap-datepicker.readthedocs.org/en/latest/methods.html
        // data.targetDate = formElement.targetDate.datepicker('getDate');
        var value = $(formElement.targetDate).datepicker('getDate');
        console.log(value);
        data.targetDate = ko.observable(value);

        data.priority = ko.observable(parseInt(formElement.priority.value));

        // TODO jQuery form validation?

        // Push down other request priorities
        var priority = data.priority();
        $.each(viewModel.requests(), function (i, req) {
            if (req.priority() >= priority) {
                req.priority(req.priority() + 1);
            }
        });

        console.info('New Request', data);
        viewModel.requests.push(data);
        self.modalElement.modal('hide')
    }
}

viewModel.createRequestForm = new CreateRequestForm();
ko.applyBindings(viewModel);
