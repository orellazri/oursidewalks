import renderer from "react-test-renderer";

import ContinueButton from "components/ContinueButton";

describe("<ContinueButton />", () => {
  it("has 2 children", () => {
    const tree = renderer.create(<ContinueButton />).toJSON();
    expect(tree.children.length).toBe(2);
  });
});
