import React, { Component, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { Form, Button, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_URL } from "../../config/index";
import { Select } from 'antd';


function NewPostRoom() {
    const [image, setImage] = useState("");
    const [price, setPrice] = useState("");
    const [area, setArea] = useState("");
    const [addition_infor, setAddition] = useState("");
    const [district, setdistrict] = useState("");
    const [ward_id, setWard] = useState("");
    const [province_id, setProvice] = useState("");
    const [address, setAdress] = useState("");
    const [set_ward, setWards] = useState([]);
    const [set_district, setDistricts] = useState([]);
    const [set_provide, setProvides] = useState([]);

    const [status, setStatus] = useState(1);
    const [hostID, setHostId] = useState(1);

    const history = useHistory();

    async function add() {
        let item = {image, price, area ,addition_infor, ward_id, province_id, address, status, hostID, district}

        await fetch("https://nhatrovn.herokuapp.com/api/room/add", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": 'application/json'
            },
            body: JSON.stringify(item)
        }).then(function (response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }).then(async function (response) {
            history.push("/")
            alert("bài đăng thành công")
        }).catch(function (error) {
            alert("Bài đăng không thành công")
        });
    }

    useEffect(() => {
        GetWard();
        GetProvice();
        GetDistrict();
    }, [])

    async function GetWard() {
        const url = `${API_URL}ward`;
        console.log(url);
        await fetch(url)
        .then(response => response.json())
        .then(data => {
            setWards(data);
        });
    }

    async function GetDistrict() {
        const url = `${API_URL}district`;
        console.log(url);
        await fetch(url)
        .then(response => response.json())
        .then(data => {
                setDistricts(data);
        });
    }

    async function GetProvice() {
        const url = `${API_URL}province`;
        console.log(url);
        await fetch(url)
        .then(response => response.json())
        .then(data => {
                setProvides(data)
        });
    }

    const fnWard = () =>  set_ward.map(option => (
            <option key= {option.id} value={option.id}>{option.name}</option>
       ));
    const fnDistrict = () =>  set_district.map(option => (
        <option key= {option.id} value={option.id}>{option.name}</option>
    ));
    const fnProvide = () =>  set_provide.map(option => (
        <option key= {option.id} value={option.id}>{option.name}</option>
    ));
    return (
        <div style={{paddingLeft: 200, paddingRight: 200, paddingTop: 50}}>   
        <p style={{fontSize: 50, color: "red", textAlign: "center"}}> <b> Đăng thông tin phòng cho thuê</b></p>      
        <Form className="mt-5">
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Địa Chỉ</Form.Label>
                <Form.Control className="rounded-0 shadow" type="text" onChange={(e) => setAdress(e.target.value)} placeholder="Nhập địa chỉ" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Thành phố</Form.Label>
                <FormControl as="select" type="text" className="rounded-0 shadow" onChange={(e) => setProvice(e.target.value)}>
                    <option></option>
                    {fnProvide()}
                </FormControl>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Tỉnh</Form.Label>
                <FormControl as="select" type="text" className="rounded-0 shadow" onChange={(e) => setWard(e.target.value)}>
                    <option></option>
                    {fnWard()}
                </FormControl>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label>Quận</Form.Label>
                <FormControl as="select" type="text" className="rounded-0 shadow" onChange={(e) => setdistrict(e.target.value)}>
                    <option></option>
                    {fnDistrict()}
                </FormControl>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Thông tin phòng</Form.Label>
                <Form.Control className="rounded-0 shadow" type="email" onChange={(e) => setAddition(e.target.value)} placeholder="Nhập thông tin phòng" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Diện Tích căn phòng</Form.Label>
                <Form.Control className="rounded-0 shadow" type="number" onChange={(e) => setArea(e.target.value)} placeholder="Nhập diện tích phòng" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Giá Phòng</Form.Label>
                <Form.Control className="rounded-0 shadow" type="number" onChange={(e) => setPrice(e.target.value)} placeholder="Nhập giá căn phòng" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Hình Ảnh</Form.Label>
                <Form.Control className="rounded-0 shadow" type="file" onChange={(e) => setImage(e.target.value)} placeholder="Nhập giá căn phòng" />
            </Form.Group>
            <Button style={{marginTop: 15}} onClick={() => {add()}} variant="primary">
                Đăng tin
            </Button>
        </Form>
        </div>
    );
}

export default NewPostRoom;