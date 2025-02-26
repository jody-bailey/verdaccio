import {
  addRegistry,
  initialSetup,
  npmUtils,
  prepareGenericEmptyProject,
} from '@verdaccio/test-cli-commons';

import { npm } from './utils';

describe('star a package', () => {
  jest.setTimeout(20000);
  let registry;

  beforeAll(async () => {
    const setup = await initialSetup();
    registry = setup.registry;
    await registry.init();
  });

  test.each([['@verdaccio/foo']])('should star a package %s', async (pkgName) => {
    const { tempFolder } = await prepareGenericEmptyProject(
      pkgName,
      '1.0.0-patch',
      registry.port,
      registry.getToken(),
      registry.getRegistryUrl()
    );

    await npmUtils.publish(npm, tempFolder, pkgName, registry);
    const resp = await npm(
      { cwd: tempFolder },
      'star',
      pkgName,
      ...addRegistry(registry.getRegistryUrl())
    );
    expect(resp.stdout).toEqual(`★  ${pkgName}`);
  });

  test.each([['@verdaccio/bar']])('should unstar a package %s', async (pkgName) => {
    const { tempFolder } = await prepareGenericEmptyProject(
      pkgName,
      '1.0.0-patch',
      registry.port,
      registry.getToken(),
      registry.getRegistryUrl()
    );

    await npmUtils.publish(npm, tempFolder, pkgName, registry);
    const resp = await npm(
      { cwd: tempFolder },
      'star',
      pkgName,
      ...addRegistry(registry.getRegistryUrl())
    );
    expect(resp.stdout).toEqual(`★  ${pkgName}`);

    const resp1 = await npm(
      { cwd: tempFolder },
      'unstar',
      pkgName,
      ...addRegistry(registry.getRegistryUrl())
    );
    expect(resp1.stdout).toEqual(`☆  ${pkgName}`);
  });

  afterAll(async () => {
    registry.stop();
  });
});
