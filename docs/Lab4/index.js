class NavBar extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        searchedDesc: "",
        searchedTag: "",
    }

    handleDescInputChange = (event) => {
        this.setState({
            searchedDesc: event.target.value,
        });
        this.props.captureDescSearching(event.target.value)
    }

    handleTagInputChange = (event) => {
        this.setState({
            searchedTag: event.target.value,
        });
        this.props.captureTagSearching(event.target.value)
    }

    render() {
        return (
            <div className="container-fluid mt-2">
                <nav className="navBar">
                    <div className="col-2 logo-box">
                        <img className="img-fluid logo border mx-5" src="./logo.png" alt="Logo"/>
                    </div>
                    <div className="col-5 nav-elem">
                        <div className="col-5">
                            <label htmlFor="descSearch" className="main-text-type">Search in description</label>
                        </div>
                        <div className="col-5">
                            <form className="form-check-inline">
                                <input className="form-control" type="search" placeholder="Description"
                                       aria-label="Description" id="descSearch" onChange={this.handleDescInputChange}/>
                            </form>
                        </div>
                    </div>
                    <div className="col-5 nav-elem">
                        <div className="col-5">
                            <label htmlFor="tagSearch" className="main-text-type">Search for tag</label>
                        </div>
                        <div className="col-5">
                            <form className="form-check-inline">
                                <input className="form-control" type="search" placeholder="Tag"
                                       aria-label="Tag" id="tagSearch" onChange={this.handleTagInputChange}/>
                            </form>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

class Student {
    constructor(name, surname, description, photoSrc, tags) {
        this.name = name;
        this.surname = surname;
        this.description = description;
        this.photoSrc = photoSrc;
        this.tags = tags;
    }
}

class Warning extends React.Component {
    state = {
        warningContent: ""
    }

    render() {
        return (
            this.state.showWarning ?
                <>
                    <div className="col-12 mb-2">
                        <h3>Wrong entery</h3>
                    </div>
                    <div className="row col-12 mb-2">
                        <p>Need to enter {this.state.warningContent}</p>
                    </div>
                </>
                :
                null
        )
    }
}

const AddStudent = (props) => {
    const [name, setName] = React.useState("");
    const [surname, setSurname] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [tags, setTags] = React.useState("");
    const [photoUrl, setPhotoUrl] = React.useState("");
    const [showWarning, setShowWarning] = React.useState(false);
    let newStud = null;

    function handleChangeImage(event) {
        setPhotoUrl(URL.createObjectURL(event.target.files[0]));
    }

    function onPressed() {
        let t;
        if (name !== "" && surname !== "") {
            if (photoUrl === "") {
                t = tags.toLowerCase().split(" ");
                newStud = new Student(name, surname, description, "./person.png", t);
            } else {
                t = tags.toLowerCase().split(" ");
                newStud = new Student(name, surname, description, photoUrl, t);
            }
            props.parentCallback(newStud);
            newStud = null;
            setName("");
            setSurname("");
            setDescription("");
            setPhotoUrl("");
            setTags("");
            setShowWarning(false);
        } else if (name === "") {
            setShowWarning(true);
        } else if (name === "") {
            setShowWarning(true);
        }
    }

    function handleKey(event) {
        if (event.code === "Enter") {
            let t;
            if (name !== "" && surname !== "") {
                if (photoUrl === "") {
                    t = tags.split(" ");
                    newStud = new Student(name, surname, description, "./person.png", t);
                } else {
                    t = tags.split(" ");
                    newStud = new Student(name, surname, description, photoUrl, t);
                }
                props.parentCallback(newStud);
                newStud = null;
                setName("");
                setSurname("");
                setDescription("");
                setPhotoUrl("");
                setTags("");
                setShowWarning(false);
            } else if (name === "") {
                setShowWarning(true);
            } else if (name === "") {
                setShowWarning(true);
            }
        }
    }

    return (
        <>
            <aside className="panel adding-form">
                <div className="container">
                    <div className="row">
                        <div className="col-12 mb-2">
                            <h3>Student application</h3>
                        </div>
                        <div className="row col-12 mb-2">
                            <div className="col-lg-12 col-xl-4">
                                <label htmlFor="name">Name: </label>
                            </div>
                            <div className="col-lg-12 col-xl-8">
                                <input
                                    type={"text"}
                                    value={name}
                                    id={"name"}
                                    className={"bg-light form-control"}
                                    onChange={(e) => setName(e.target.value)}
                                    onKeyDown={handleKey}
                                />
                            </div>
                        </div>
                        <div className="row col-12 mb-2">
                            <div className="col-lg-12 col-xl-4">
                                <label htmlFor="surname">Surname: </label>
                            </div>
                            <div className="col-lg-12 col-xl-8">
                                <input
                                    type={"text"}
                                    value={surname}
                                    id={"surname"}
                                    className={"bg-light form-control"}
                                    onChange={(e) => setSurname(e.target.value)}
                                    onKeyDown={handleKey}
                                />
                            </div>
                        </div>
                        <div className="row col-12 mb-2">
                            <div className="col-lg-12 col-xl-4">
                                <label htmlFor="description">Description: </label>
                            </div>
                            <div className="col-lg-12 col-xl-8">
                            <textarea
                                value={description}
                                id={"description"}
                                className={"bg-light form-control break-text"}
                                onChange={(e) => setDescription(e.target.value)}
                                onKeyDown={handleKey}
                            />
                            </div>
                        </div>
                        <div className="row col-12 mb-2">
                            <div className="col-lg-12 col-xl-4">
                                <label htmlFor="tags">Tags: </label>
                            </div>
                            <div className="col-lg-12 col-xl-8">
                                <input
                                    type={"text"}
                                    value={tags}
                                    id={"tags"}
                                    className={"bg-light form-control"}
                                    onChange={(e) => setTags(e.target.value)}
                                    onKeyDown={handleKey}
                                />
                            </div>
                        </div>
                        <div className="row col-12 mb-2">
                            <div className="col-lg-12 col-xl-4">
                                <label htmlFor="img">Photo: </label>
                            </div>
                            <div className="col-lg-12 col-xl-8">
                                <input
                                    type="file"
                                    id="img"
                                    name="img"
                                    accept="image/*"
                                    className={"bg-light form-control"}
                                    onChange={handleChangeImage}
                                />
                            </div>
                        </div>
                        <div className="row col-12  mb-2">
                            <div className="col-12">
                                <button className="btn btn-success my-button" onClick={onPressed}>Apply</button>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
            {showWarning &&
            <div className="panel adding-form mt-3">
                <div className="container">
                    <div className="col-12 mb-2">
                        <div className="col-12 mb-2">
                            <h3>Wrong entery</h3>
                        </div>
                        <div className="row col-12 mb-2">
                            <p>Need to enter name and surename</p>
                        </div>
                    </div>
                </div>
            </div>
            }
        </>
    )
}

class StudentInfoPane extends React.Component {

    state = {
        student: this.props.studentInfo,
    }

    render() {
        const listToRender = this.state.student.tags.map((tag, index) => (
            <li key={index + 10} style={{display: "inline"}}>{tag} </li>
        ));
        return (
            <div className="panel container-fluid m-3 pane-text-type">
                <div className="row">
                    <div className="col-3">
                        <img className="img-fluid photo photo-border"
                             src={this.state.student.photoSrc} alt="Profile picture"
                        />
                    </div>
                    <div className="col-7 container-fluid">
                        <div className="col-12">
                            <div className="row col-12">
                                <h5>{this.state.student.name} {this.state.student.surname}</h5>
                            </div>
                            <div className="row col-12">
                                <h6>Description:</h6>
                                <p className="text-justify">{this.state.student.description}</p>
                            </div>
                            <div className="row col-12">
                                <h6>Tags:</h6>
                                <ul>
                                    {listToRender}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-2 message-box">
                        <img className="img-fluid message border "
                             alt="Send message icon" src="./message.png"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

class Students extends React.Component {

    render() {
        let count = 0;
        const renderStudentsList = React.Children.map(React.Children.toArray(this.props.children), child => {
            if (child !== null) {
                count++;
                return (
                    <>{child}</>
                );
            }
        });
        return (
            <>
                <div className="container-fluid col-12 m-3 ">
                    <div className=" col-12 panel pane-text-type align-content-center">
                        <h5>Found {count} results.</h5>
                    </div>
                </div>
                {renderStudentsList}
            </>
        );
    }
}

class App extends React.Component {
    state = {
        studentsList: [
            new Student(
                "Artur",
                "Sobolewski",
                "Coś tam umiem",
                "./linus.jpg",
                ["javascript", "css", "java"]),
            new Student(
                "Konrad",
                "Brzeziński",
                "Jestem komunikatywną osobą. Student 3 roku",
                "./person.png",
                ["javascript", "css", "react", "c++"]),
            new Student(
                "Mateusz",
                "Woźniak",
                "Ambitny, otwarty na zdobycie nowych umiejętności",
                "./sample_pic.png",
                ["c", "c++", "python"]),
        ],
        panelsList: [],
        searchingDesc: "",
        searchingTag: "",
        count: 0
    }

    handleCallback = (newStud) => {
        this.setState({
            studentsList: this.state.studentsList.concat(newStud),

        })
    }

    handleSearchingDescValue = (value) => {
        this.setState({
            searchingDesc: value
        })
    }

    handleSearchingTagValue = (value) => {
        this.setState({
            searchingTag: value.toString().toLowerCase()
        })
    }

    render() {
        const renderStudentsList = this.state.studentsList.map((student, index) => {
            if (this.state.searchingDesc === "") {
                if (this.state.searchingTag === "") {
                    return (

                        <StudentInfoPane key={index} studentInfo={student}/>

                    )
                } else if (student.tags.includes(this.state.searchingTag)) {
                    return (
                        <>
                            <StudentInfoPane key={index} studentInfo={student}/>
                        </>
                    )
                }
            } else {
                if (this.state.searchingTag === "") {
                    if (
                        student.description.toString().toLocaleLowerCase().includes(
                            this.state.searchingDesc.toLocaleLowerCase())) {
                        return (
                            <>
                                <StudentInfoPane key={index} studentInfo={student}/>
                            </>
                        )
                    }
                } else if (student.description.toString().toLocaleLowerCase().includes(
                    this.state.searchingDesc.toLocaleLowerCase()) &&
                    student.tags.includes(this.state.searchingTag)) {
                    return (
                        <>
                            <StudentInfoPane key={index} studentInfo={student}/>
                        </>
                    )
                }
            }
        });
        const studentsToArray = () => {
            const map = {renderStudentsList};
            return Object.keys(map).map((key) => map[key]);
        }
        return (
            <>
                <NavBar
                    captureDescSearching={this.handleSearchingDescValue}
                    captureTagSearching={this.handleSearchingTagValue}
                />
                <div className="main-cont">
                    <div className="row">
                        <div className="col-6" id="listOfStudents">
                            <Students children={studentsToArray()}/>
                        </div>

                        <div className="col-4 offset-2">
                            <AddStudent parentCallback={this.handleCallback}/>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);

