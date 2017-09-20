import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
    name: DS.attr('string'),
    isCompleted: DS.attr('boolean', {defaultValue: false})
});
