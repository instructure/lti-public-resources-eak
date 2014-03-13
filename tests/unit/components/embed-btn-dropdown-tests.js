import { test, moduleForComponent } from 'ember-qunit';
import EmbedBtnDropdownComponent from 'appkit/components/embed-btn-dropdown';

var component, item, rt1, rt2, rt3;

moduleForComponent('embed-btn-dropdown', 'Unit: components/embed-btn-dropdown', {
  setup: function() {
    rt1 = Ember.Object.create({ displayReturnType: 'rt1' });
    rt2 = Ember.Object.create({ displayReturnType: 'rt2' });
    rt3 = Ember.Object.create({ displayReturnType: 'rt3' });
    item = Ember.Object.create({
      returnableReturnTypes: [rt1, rt2, rt3],
      defaultReturnType: rt2
    });
    component = this.subject({ action: 'embedItem', item: item });
  }
});

test('sends the defaultReturnType when clicking the default button', function() {
  expect(1);

  var spy = sinon.spy(component, 'sendAction');
  this.append();

  Ember.run(function() {
    component.$('button[rel="default-embed"]').simulate('click');
    ok(spy.withArgs('action', rt2).calledOnce, 'embedItem was called with rt2 (default) as argument');
  });
});

test('sends the selected return type when clicking the dropdown button option', function() {
  expect(2);

  var spy = sinon.spy(component, 'sendAction');
  this.append();
  component.$('button.dropdown-toggle').simulate('click');
  equal(component.$('ul li').length, 3);
  component.$('ul li:first a').simulate('click');
  ok(spy.withArgs('action', rt1).calledOnce, 'embedItem was called with rt1 as argument');
});