import axios from "axios";
import { useEffect, useState } from "react";

function StudentCrud() {

    const [id, setId] = useState("");
    const [stname, setName] = useState("");
    const [course, setCourse] = useState("");
    const [students, setUsers] = useState([]);

    useEffect(() => {
        (async () => await Load())();
    }, []);

    async function Load() {

        const result = await axios.get("https://localhost:7294/api/Student/GetStudent");
        setUsers(result.data);
        console.log(result.data);
    }

    async function save(event) {

        event.preventDefault();
        try {
            await axios.post("https://localhost:7294/api/Student/AddStudent", {

                stname: stname,
                course: course,

            });
            alert("Student Registation Successfully");
            setId("");
            setName("");
            setCourse("");


            Load();
        } catch (err) {
            alert(err);
        }
    }

    async function editStudent(students) {
        setName(students.stname);
        setCourse(students.course);


        setId(students.id);
    }


    async function DeleteStudent(id) {
        await axios.delete("https://localhost:7294/api/Student/DeleteStudent/" + id);
        alert("Employee deleted Successfully");
        setId("");
        setName("");
        setCourse("");
        Load();
    }


    async function update(event) {
        event.preventDefault();
        try {

            await axios.patch("https://localhost:7294/api/Student/UpdateStudent/" + students.find((u) => u.id === id).id || id,
                {
                    id: id,
                    stname: stname,
                    course: course,

                }
            );
            alert("Registation Updateddddd");
            setId("");
            setName("");
            setCourse("");

            Load();
        } catch (err) {
            alert(err);
        }
    }

    return (
        <div>
            <h1>Student Details</h1>
            <div class="container mt-4">
                <form>
                    <div class="form-group">

                        <input
                            type="text"
                            class="form-control"
                            id="id"
                            hidden
                            value={id}
                            onChange={(event) => {
                                setId(event.target.value);
                            }}
                        />

                        <label>Student Name</label>
                        <input
                            type="text"
                            class="form-control"
                            id="stname"
                            value={stname}
                            onChange={(event) => {
                                setName(event.target.value);
                            }}
                        />
                    </div>
                    <div class="form-group">
                        <label>Course</label>
                        <input
                            type="text"
                            class="form-control"
                            id="course"
                            value={course}
                            onChange={(event) => {
                                setCourse(event.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <button class="btn btn-primary mt-4" onClick={save}>
                            Register
                        </button>
                        <button class="btn btn-warning mt-4" onClick={update}>
                            Update
                        </button>
                    </div>
                </form>
            </div>
            <br></br>

            <table class="table table-dark" align="center">
                <thead>
                    <tr>
                        <th scope="col">Student Id</th>
                        <th scope="col">Student Name</th>
                        <th scope="col">Course</th>


                        <th scope="col">Option</th>
                    </tr>
                </thead>
                {students.map(function fn(student) {
                    return (
                        <tbody>
                            <tr>
                                <th scope="row">{student.id} </th>
                                <td>{student.stname}</td>
                                <td>{student.course}</td>

                                <td>
                                    <button
                                        type="button"
                                        class="btn btn-warning"
                                        onClick={() => editStudent(student)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        class="btn btn-danger"
                                        onClick={() => DeleteStudent(student.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    );
                })}
            </table>

        </div>
    );
}

export default StudentCrud;