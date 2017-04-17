/**
@author:fanyonglonng
@desc 数据源
*/
define(["tongcerequest"], function () {
    function DataSource(options) {
        if (!(this instanceof DataSource)) {
            return new DataSource(options);
        }
        this.data = null;
        this.options = options = Tc.extend({}, DataSource.settings.defaulOptions, options);
        if (options.transport) {
            this.transport = Tc.hasInstanceof(options.transport, RemoteTransport) ? options.transport : RemoteTransport(options.transport);
        }
    }
    DataSource.prototype = {
        constructor: DataSource,
        refresh: function (data) {
            if (this.transport) {
                this.transport.refresh(data);
            } else {
                this.done(this.options.data, this.options.data);
            }
        },
        read: function (data) {
            if (this.transport) {
                this.transport.read(data);
            } else {
                this.done(this.options.data, this.options.data);
            }
        },
        getData: function () {
            return this.data;
        },
        then: function (done, fail) {

            var that = this;
            this.done = function (d, datasource) {
                that.data = d;
                that._source = datasource;
                done(d);
            };
            this.fail = function (e) {
                that.data = null;
                that._source = null;
                fail && fail.apply(that, arguments);
            }
            if (this.transport) {
                this.transport.then(this.done, this.fail);
            }
            return this;
        }
    };
    DataSource.settings = {
        defaulOptions: {
            data: [],
            transport: null
        }
    };
    function RemoteTransport(options) {
        if (!(this instanceof RemoteTransport)) {
            return new RemoteTransport(options);
        }
        this.options = options = Tc.extend({}, RemoteTransport.settings.defaultOptions, options);
        this.requestOption = Tc._.omit(this.options, RemoteTransport.settings.ajaxOptions);
    }
    RemoteTransport.prototype = {
        constructor: RemoteTransport,
        refresh: function (data) {
            var name = this.options.name, options = Tc._.create(this.requestOption);
            if (data) {
                options.data = data;
            }
            Tc.request(name, options, this.done, this.fail);
        },
        read: function (data) {
            var name = this.options.name, options = Tc._.create(this.requestOption);
            if (data) {
                options.data = Tc.extend({}, options.data, data);
            }
            Tc.request(name, options, this.done, this.fail);
        },
        then: function (done, fail) {
            var options = this.options, that = this;
            this.done = function (d) {
                done(options.parseData(d), d);
            };
            this.fail = fail;
            return this;
        }
    };
    RemoteTransport.settings = {
        ajaxOptions: ["parseData", "name"],
        defaultOptions: {
            name: "",
            data: null,
            parseData: function (d) { return d; }
        }
    };

    Tc.define({
        dataSource: DataSource,
        remoteTransport: RemoteTransport
    });

});