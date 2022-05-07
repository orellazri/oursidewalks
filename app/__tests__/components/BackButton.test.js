import renderer from "react-test-renderer";

import BackButton from "components/BackButton";

describe("<BackButton />", () => {
  it("has 1 child", () => {
    const tree = renderer.create(<BackButton />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});
