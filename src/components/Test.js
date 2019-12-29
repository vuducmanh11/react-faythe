import React from "react";
import ReactDOM from "react-dom";
import uuid from "uuid";

// import "./styles.css";

class Test extends React.Component {
  state = {
    tabs: [
      { id: 1, name: "Tab 1", content: "Wow this is tab 1" },
      { id: 2, name: "Tab 2", content: "Look at me, it's Tab 2" }
    ],
    currentTab: { id: 1, name: "Tab 1", content: "Wow this is tab 1" },
    editMode: false,
    editTabNameMode: false
  };

  handleDoubleClick = () => {
    this.setState({
      editTabNameMode: true
    });
  };

  handleEditTabName = e => {
    const { currentTab, tabs } = this.state;

    const updatedTabs = tabs.map(tab => {
      if (tab.id === currentTab.id) {
        return {
          ...tab,
          name: e.target.value
        };
      } else {
        return tab;
      }
    });

    this.setState({
      tabs: updatedTabs,
      currentTab: {
        ...currentTab,
        name: e.target.value
      }
    });
  };

  handleOnBlur = () => {
    this.setState({
      editTabNameMode: false
    });
  };

  createTabs = () => {
    const { tabs, currentTab, editTabNameMode } = this.state;

    const allTabs = tabs.map(tab => {
      return (
        <li>
          {editTabNameMode && currentTab.id === tab.id ? (
            <input
              value={tab.name}
              onBlur={this.handleOnBlur}
              onChange={this.handleEditTabName}
            />
          ) : (
            <button
              className={currentTab.id === tab.id ? "tab active" : "tab"}
              onClick={() => this.handleSelectTab(tab)}
              onDoubleClick={() => this.handleDoubleClick(tab)}
            >
              {tab.name}
            </button>
          )}
        </li>
      );
    });

    return <ul className="nav nav-tabs">{allTabs}</ul>;
  };

  handleSelectTab = tab => {
    this.setState({
      currentTab: tab,
      editMode: false,
      editTabNameMode: false
    });
  };

  handleAddTab = () => {
    const { tabs } = this.state;

    const newTabObject = {
      id: uuid(),
      name: `Tab ${tabs.length + 1}`,
      content: `This is Tab ${tabs.length + 1}`
    };

    this.setState({
      tabs: [...tabs, newTabObject],
      currentTab: newTabObject,
      editMode: false,
      editTabNameMode: false
    });
  };

  handleDeleteTab = tabToDelete => {
    const { tabs } = this.state;
    const tabToDeleteIndex = tabs.findIndex(tab => tab.id === tabToDelete.id);

    const updatedTabs = tabs.filter((tab, index) => {
      return index !== tabToDeleteIndex;
    });

    const previousTab =
      tabs[tabToDeleteIndex - 1] || tabs[tabToDeleteIndex + 1] || {};

    this.setState({
      tabs: updatedTabs,
      editMode: false,
      editTabNameMode: false,
      currentTab: previousTab
    });
  };

  setEditMode = () => {
    this.setState({
      editMode: !this.state.editMode
    });
  };

  handleContentChange = e => {
    const { tabs, currentTab } = this.state;

    const updatedTabs = tabs.map(tab => {
      if (tab.name === currentTab.name) {
        return {
          ...tab,
          content: e.target.value
        };
      } else {
        return tab;
      }
    });

    this.setState({
      tabs: updatedTabs,
      currentTab: {
        ...currentTab,
        content: e.target.value
      }
    });
  };

  render() {
    const { currentTab, editMode } = this.state;
    return (
      <div className="container">
        <div className="well">
          <button className="add-tab-button" onClick={this.handleAddTab}>
            <i className="text-primary fas fa-plus-square" /> Add Tab
          </button>
          {this.createTabs()}
          <div className="tab-content">
            {editMode ? (
              <div>
                <textarea
                  onChange={this.handleContentChange}
                  value={this.state.currentTab.content}
                />
                <button className="save-button" onClick={this.setEditMode}>
                  Done
                </button>
              </div>
            ) : (
              <div>
                <p>{currentTab.content}</p>
                {currentTab.id ? (
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <button
                      className="edit-mode-button"
                      onClick={this.setEditMode}
                    >
                      Edit
                    </button>
                    <button onClick={() => this.handleDeleteTab(currentTab)}>
                      Delete
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Test />, rootElement);
export default Test
