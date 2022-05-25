import renderer from "react-test-renderer";

import SummaryRow from "components/SummaryRow";

describe("<SummaryRow />", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<SummaryRow />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});