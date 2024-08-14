import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduct = () => {
    const navigate = useNavigate();
    const [catedata, setCatedata] = useState([]);
    const [collectiondata, setCollectiondata] = useState([]);
    const [loading, setLoading] = useState(false);

    const getApiData = async () => {
        try {
            let res = await axios.get("http://localhost:8000/api/category");
            setCatedata(res.data.data);
        } catch (error) {
            console.error('Error fetching category data:', error);
            toast.error('Failed to fetch categories.');
        }
    };

    const getCollectionData = async () => {
        try {
            let res = await axios.get("http://localhost:8000/api/bestseller");
            setCollectiondata(res.data.data);
        } catch (error) {
            console.error('Error fetching category data:', error);
            toast.error('Failed to fetch categories.');
        }
    };

    const [data, setData] = useState({
        name: '',
        category: '',
        collectionname: '',
        sizes: [{ pair: '', price: '', discountprice: '', finalprice: '' }],
        productdetails: '',
        numberoffoot: [''],
        description: '',
        tag: '',
        stock: '',
        pic1: '',
        pic2: '',
        pic3: '',
        pic4: ''
    });

    const getInputData = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const getInputfile = (e) => {
        const { name, files } = e.target;
        setData({ ...data, [name]: files[0] });
    };

    const handleSizeChange = (index, field, value) => {
        const updatedSizes = [...data.sizes];
        updatedSizes[index][field] = value;
        const price = parseFloat(updatedSizes[index].price) || 0;
        const discountPercent = parseFloat(updatedSizes[index].discountprice) || 0;
        if (field === 'price' || field === 'discountprice') {
            const discountAmount = (price * discountPercent) / 100;
            updatedSizes[index].finalprice = price - discountAmount;
        }

        setData(prevData => ({ ...prevData, sizes: updatedSizes }));
    };

    const removeSize = (index) => {
        const updatedSizes = [...data.sizes];
        updatedSizes.splice(index, 1);
        setData(prevData => ({ ...prevData, sizes: updatedSizes }));
    };

    const handleNumberoffootChange = (index, value) => {
        const updatedNumberoffoot = [...data.numberoffoot];
        updatedNumberoffoot[index] = value;
        setData(prevData => ({ ...prevData, numberoffoot: updatedNumberoffoot }));
    };

    const addNumberoffoot = () => {
        setData(prevData => ({ ...prevData, numberoffoot: [...prevData.numberoffoot, ''] }));
    };

    const removeNumberoffoot = (index) => {
        const updatedNumberoffoot = [...data.numberoffoot];
        updatedNumberoffoot.splice(index, 1);
        setData(prevData => ({ ...prevData, numberoffoot: updatedNumberoffoot }));
    };

    const postData = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading state
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('category', data.category);
            formData.append('collectionname', data.collectionname);
            formData.append('stock', data.stock);
            formData.append('description', data.description);
            formData.append('productdetails', data.productdetails);
            formData.append('tag', data.tag);
            formData.append('pic1', data.pic1);
            formData.append('pic2', data.pic2);
            formData.append('pic3', data.pic3);
            formData.append('pic4', data.pic4);
            data.sizes.forEach((size, index) => {
                formData.append(`sizes[${index}][pair]`, size.pair);
                formData.append(`sizes[${index}][price]`, size.price);
                formData.append(`sizes[${index}][discountprice]`, size.discountprice);
                formData.append(`sizes[${index}][finalprice]`, size.finalprice);
            });
            data.numberoffoot.forEach((number, index) => {
                formData.append(`numberoffoot[${index}]`, number);
            });
            const res = await axios.post('http://localhost:8000/api/product', formData);
            if (res.status === 200) {
                toast.success('New Product created');
                navigate('/all-products');
            }
        } catch (error) {
            console.error('Error creating product:', error);
            toast.error('Failed to create product.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getApiData();
        getCollectionData();
    }, []);

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add Product</h4>
                </div>
                <div className="links">
                    <Link to="/all-products" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form onSubmit={postData} className="mt-4">
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <label htmlFor="name" className="form-label">Product Name<sup className='text-danger'>*</sup></label>
                            <input type="text" id="name" name="name" onChange={getInputData} className="form-control" required />
                        </div>
                        <div className="col-md-4 mb-3 mt-2">
                            <label htmlFor="category">Select Category<sup className='text-danger'>*</sup></label>
                            <select name="category" id="category" onChange={getInputData} className="form-control" required>
                                <option value="" disabled selected>Choose Category</option>
                                {catedata.map((item, index) =>
                                    <option key={index} value={item.name}>{item.name}</option>
                                )}
                            </select>
                        </div>
                        <div className="col-md-4 mb-3 mt-2">
                            <label htmlFor="collectionname">Select Collection<sup className='text-danger'>*</sup></label>
                            <select name="collectionname" id="collectionname" onChange={getInputData} className="form-control" required>
                                <option value="" disabled selected>Choose Collection</option>
                                {collectiondata.map((item, index) =>
                                    <option key={index} value={item.traindingName}>{item.traindingName}</option>
                                )}
                            </select>
                        </div>

                        {data.sizes.map((size, index) => (
                            <div key={index} className="col-md-12 mb-3">
                                <div className="row">
                                    <div className="col-md-3">
                                        <label htmlFor={`size${index + 1}`} className="form-label">Pair {index + 1}:<sup className='text-danger'>*</sup></label>
                                        <input type="text" name={`pair${index + 1}`} value={size.pair} onChange={(e) => handleSizeChange(index, 'pair', e.target.value)} className="form-control" required />
                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor={`price${index + 1}`} className="form-label">Price {index + 1}:<sup className='text-danger'>*</sup></label>
                                        <input type="number" name={`price${index + 1}`} value={size.price} onChange={(e) => handleSizeChange(index, 'price', e.target.value)} className="form-control" required />
                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor={`discountprice${index + 1}`} className="form-label">Discount Percentage {index + 1}:<sup className='text-danger'>*</sup></label>
                                        <input type="number" name={`discountprice${index + 1}`} value={size.discountprice} onChange={(e) => handleSizeChange(index, 'discountprice', e.target.value)} className="form-control" required />
                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor={`finalprice${index + 1}`} className="form-label">Final Price {index + 1}:<sup className='text-danger'>*</sup></label>
                                        <input type="number" name={`finalprice${index + 1}`} value={size.finalprice} onChange={(e) => handleSizeChange(index, 'finalprice', e.target.value)} className="form-control" readOnly required />
                                    </div>
                                    <div className="col-md-12 text-end w-100">
                                        <button type="button" onClick={() => removeSize(index)} className="btn btn-danger mt-2">Remove Size</button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="col-md-12  text-end mb-3">
                            <button type="button" onClick={() => setData(prevData => ({ ...prevData, sizes: [...prevData.sizes, { pair: '', price: '', discountprice: '', finalprice: '' }] }))} className="btn btn-primary">Add Size</button>
                        </div>

                        {data.numberoffoot.map((number, index) => (
                            <div key={index} className="col-md-12 mb-3">
                                <div className="row">
                                    <div className="col-md-3">
                                        <label htmlFor={`numberoffoot${index + 1}`} className="form-label">Number of Size {index + 1}:<sup className='text-danger'>*</sup></label>
                                        <input type="text" name={`numberoffoot${index + 1}`} value={number} onChange={(e) => handleNumberoffootChange(index, e.target.value)} className="form-control" required />
                                    </div>
                                    <div className="col-md-12 text-end">
                                        <button type="button" onClick={() => removeNumberoffoot(index)} className="btn btn-danger mt-2">Remove Number of Foot</button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="col-md-12 text-end mb-3">
                            <button type="button" onClick={addNumberoffoot} className="btn btn-primary">Add Number of Foot</button>
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="productdetails" className="form-label">Product Details<sup className='text-danger'>*</sup></label>
                            <textarea name="productdetails" id="productdetails" onChange={getInputData} className="form-control" required />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="description" className="form-label">Description<sup className='text-danger'>*</sup></label>
                            <textarea name="description" id="description" onChange={getInputData} className="form-control" required />
                        </div>

                        <div className="col-md-4 mb-3">
                            <label htmlFor="tag" className="form-label">Tag<sup className='text-danger'>*</sup></label>
                            <input type="text" name="tag" id="tag" onChange={getInputData} className="form-control" required />
                        </div>

                        <div className="col-md-4 mb-3">
                            <label htmlFor="stock" className="form-label">Stock<sup className='text-danger'>*</sup></label>
                            <input type="number" name="stock" id="stock" onChange={getInputData} className="form-control" required />
                        </div>

                        <div className="col-md-4 mb-3">
                            <label htmlFor="pic1" className="form-label">Image 1<sup className='text-danger'>*</sup></label>
                            <input type="file" name="pic1" id="pic1" onChange={getInputfile} className="form-control" required />
                        </div>

                        <div className="col-md-4 mb-3">
                            <label htmlFor="pic2" className="form-label">Image 2</label>
                            <input type="file" name="pic2" id="pic2" onChange={getInputfile} className="form-control" />
                        </div>

                        <div className="col-md-4 mb-3">
                            <label htmlFor="pic3" className="form-label">Image 3</label>
                            <input type="file" name="pic3" id="pic3" onChange={getInputfile} className="form-control" />
                        </div>

                        <div className="col-md-4 mb-3">
                            <label htmlFor="pic4" className="form-label">Image 4</label>
                            <input type="file" name="pic4" id="pic4" onChange={getInputfile} className="form-control" />
                        </div>

                        <div className="col-md-12 text-end">
                            <button type="submit" className="btn btn-success" disabled={loading}>
                                {loading ? 'Please Wait...' : 'Add A New Product'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddProduct;
