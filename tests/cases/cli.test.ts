var coffee = require('coffee');
var fs = require('fs');
var shell = require('shelljs');
import path from 'path'



describe('tkeel cli', function () {


  test('explam', function () {

    const content = fs.readFileSync(path.resolve('tests/expected/tkeel.txt'), 'utf-8')
    var act = shell.exec('tkeel', { silent: true }).stdout;
    expect(act).toBe(content)

  })

  test('tkeel', (done) => {

    const content = fs.readFileSync(path.resolve('tests/expected/tkeel.txt'), 'utf-8')
    coffee.spawn('tkeel')
      .expect('stdout', content)
      .end(done);

  });


  test.each(['-v', '--version'])('version', (args, done) => {

    coffee.spawn('tkeel', [args])
      .expect('stdout', 'Keel CLI version: 0.1.0 \n')
      .end(done);
  });


  test.each(['-h', '--help'])('help', (args, done) => {

    coffee.spawn('tkeel', [args])
      .expect('stdout', /Manager plugins. Supported platforms: Kubernetes/)
      .end(done);
  });


  test('help_plugin', function (done) {

    const content = fs.readFileSync(path.resolve('tests/expected/help_plugin.txt'), 'utf-8')
    coffee.spawn('tkeel', ["help", "plugin"])
      .expect('stdout', content)
      .end(done);
  });


  test.skip('plugin_list', function (done) {

    coffee.spawn('tkeel', ['plugin', 'list'])
      .expect('stdout', /NAME     NAMESPACE  HEALTHY  STATUS   PLUGINSTATUS  REPLICAS  VERSION  AGE  CREATED/)
      .expect('stdout', /core     testing    True     Running  ACTIVE        1         0.0.1/)
      .expect('stdout', /auth     testing    True     Running  ACTIVE        1         0.0.1/)
      .expect('stdout', /keel     testing    True     Running  ACTIVE        1         0.0.1/)
      .expect('stdout', /plugins  testing    True     Running  ACTIVE        1         0.0.1/)
      .expect('stdout', /iothub   testing    True     Running  ACTIVE        1         0.0.1/)
      .end(done);
  });


  test.skip('tenent', function (done) {

    coffee.spawn('tkeel', ['tenant', 'list', '-k'])
      .expect('stdout', `❌  unexpected end of JSON input\n`)
      .end(done);
  });


});