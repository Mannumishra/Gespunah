import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProduct = () => {
    const navigate = useNavigate();
    const { _id } = useParams(); // Assuming you use a route parameter for the product ID
    const [catedata, setCatedata] = useState([]);
    const [collectiondata, setCollectiondata] = useState([]);
    const [productData, setProductData] = useState({
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
            console.error('Error fetching collection data:', error);
            toast.error('Failed to fetch collections.');
        }
    };

    const getProductData = async () => {
        try {
            let res = await axios.get(`http://localhost:8000/api/product/${_id}`);
            setProductData(res.data.data);
        } catch (error) {
            console.error('Error fetching product data:', error);
            toast.error('Failed to fetch product data.');
        }
    };

    useEffect(() => {
        getApiData();
        getCollectionData();
        getProductData();
    }, [_id]);

    const getInputData = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const getInputfile = (e) => {
        const { name, files } = e.target;
        setProductData({ ...productData, [name]: files[0] });
    };

    const handleSizeChange = (index, field, value) => {
        const updatedSizes = [...productData.sizes];
        updatedSizes[index][field] = value;
        const price = parseFloat(updatedSizes[index].price) || 0;
        const discountPercent = parseFloat(updatedSizes[index].discountprice) || 0;
        if (field === 'price' || field === 'discountprice') {
            const discountAmount = (price * discountPercent) / 100;
            updatedSizes[index].finalprice = price - discountAmount;
        }

        setProductData(prevData => ({ ...prevData, sizes: updatedSizes }));
    };

    const removeSize = (index) => {
        const updatedSizes = [...productData.sizes];
        updatedSizes.splice(index, 1);
        setProductData(prevData => ({ ...prevData, sizes: updatedSizes }));
    };

    const handleNumberoffootChange = (index, value) => {
        const updatedNumberoffoot = [...productData.numberoffoot];
        updatedNumberoffoot[index] = value;
        setProductData(prevData => ({ ...prevData, numberoffoot: updatedNumberoffoot }));
    };

    const addNumberoffoot = () => {
        setProductData(prevData => ({ ...prevData, numberoffoot: [...prevData.numberoffoot, ''] }));
    };

    const removeNumberoffoot = (index) => {
        const updatedNumberoffoot = [...productData.numberoffoot];
        updatedNumberoffoot.splice(index, 1);
        setProductData(prevData => ({ ...prevData, numberoffoot: updatedNumberoffoot }));
    };

    const putData = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading state
        try {
            const formData = new FormData();
            formData.append('name', productData.name);
            formData.append('category', productData.category);
            formData.append('collectionname', productData.collectionname);
            formData.append('stock', productData.stock);
            formData.append('description', productData.description);
            formData.append('productdetails', productData.productdetails);
            formData.append('tag', productData.tag);
            if (productData.pic1) formData.append('pic1', productData.pic1);
            if (productData.pic2) formData.append('pic2', productData.pic2);
            if (productData.pic3) formData.append('pic3', productData.pic3);
            if (productData.pic4) formData.append('pic4', productData.pic4);
            productData.sizes.forEach((size, index) => {
                formData.append(`sizes[${index}][pair]`, size.pair);
                formData.append(`sizes[${index}][price]`, size.price);
                formData.append(`sizes[${index}][discountprice]`, size.discountprice);
                formData.append(`sizes[${index}][finalprice]`, size.finalprice);
            });
            productData.numberoffoot.forEach((number, index) => {
                formData.append(`numberoffoot[${index}]`, number);
            });
            const res = await axios.put(`http://localhost:8000/api/product/${_id}`, formData);
            if (res.status === 200) {
                toast.success('Product updated successfully');
                navigate('/all-products');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            toast.error('Failed to update product.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Product</h4>
                </div>
                <div className="links">
                    <Link to="/all-products" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form onSubmit={putData} className="mt-4">
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <label htmlFor="name" className="form-label">Product Name<sup className='text-danger'>*</sup></label>
                            <input type="text" id="name" name="name" value={productData.name} onChange={getInputData} className="form-control" required />
                        </div>
                        <div className="col-md-4 mb-3 mt-2">
                            <label htmlFor="category">Select Category<sup className='text-danger'>*</sup></label>
                            <select name="category" id="category" value={productData.category} onChange={getInputData} className="form-control" required>
                                <option value="" disabled>Choose Category</option>
                                {catedata.map((item, index) =>
                                    <option key={index} value={item.name}>{item.name}</option>
                                )}
                            </select>
                        </div>
                        <div className="col-md-4 mb-3 mt-2">
                            <label htmlFor="collectionname">Select Collection<sup className='text-danger'>*</sup></label>
                            <select name="collectionname" id="collectionname" value={productData.collectionname} onChange={getInputData} className="form-control" required>
                                <option value="" disabled>Choose Collection</option>
                                {collectiondata.map((item, index) =>
                                    <option key={index} value={item.traindingName}>{item.traindingName}</option>
                                )}
                            </select>
                        </div>

                        {productData.sizes.map((size, index) => (
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
                                        <label htmlFor={`discountprice${index + 1}`} className="form-label">Discount Price {index + 1}:<sup className='text-danger'>*</sup></label>
                                        <input type="number" name={`discountprice${index + 1}`} value={size.discountprice} onChange={(e) => handleSizeChange(index, 'discountprice', e.target.value)} className="form-control" required />
                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor={`finalprice${index + 1}`} className="form-label">Final Price {index + 1}</label>
                                        <input type="number" name={`finalprice${index + 1}`} value={size.finalprice} readOnly className="form-control" />
                                    </div>
                                    <div className="col-md-12 mt-2">
                                        <button type="button" onClick={() => removeSize(index)} className="btn btn-danger">Remove Size {index + 1}</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="col-md-12">
                            <button type="button" onClick={() => setProductData(prevData => ({ ...prevData, sizes: [...prevData.sizes, { pair: '', price: '', discountprice: '', finalprice: '' }] }))} className="btn btn-primary">Add Pair</button>
                        </div>

                        {productData.numberoffoot.map((number, index) => (
                            <div key={index} className="col-md-4 mb-3 mt-3">
                                <label htmlFor={`numberoffoot${index}`} className="form-label">Number of Foot {index + 1}</label>
                                <input type="text" name={`numberoffoot${index}`} value={number} onChange={(e) => handleNumberoffootChange(index, e.target.value)} className="form-control" />
                                {index > 0 && <button type="button" onClick={() => removeNumberoffoot(index)} className="btn btn-danger mt-2">Remove Number</button>}
                            </div>
                        ))}
                        <div className="col-md-12">
                            <button type="button" onClick={addNumberoffoot} className="btn btn-primary">Add More Size</button>
                        </div>

                        <div className="col-md-6 mb-3 mt-3">
                            <label htmlFor="description" className="form-label">Description<sup className='text-danger'>*</sup></label>
                            <textarea id="description" name="description" value={productData.description} onChange={getInputData} rows="4" className="form-control" required></textarea>
                        </div>
                        <div className="col-md-6 mb-3 mt-3">
                            <label htmlFor="productdetails" className="form-label">Product Details<sup className='text-danger'>*</sup></label>
                            <textarea id="productdetails" name="productdetails" value={productData.productdetails} onChange={getInputData} rows="4" className="form-control" required></textarea>
                        </div>
                        <div className="col-md-6 mb-3 mt-3">
                            <label htmlFor="tag" className="form-label">Tag</label>
                            <input type="text" id="tag" name="tag" value={productData.tag} onChange={getInputData} className="form-control" />
                        </div>
                        <div className="col-md-6 mb-3 mt-3">
                            <label htmlFor="stock" className="form-label">Stock<sup className='text-danger'>*</sup></label>
                            <input type="number" id="stock" name="stock" value={productData.stock} onChange={getInputData} className="form-control" required />
                        </div>
                        <div className="col-md-6 mb-3 mt-3">
                            <label htmlFor="pic1" className="form-label">Image 1</label>
                            <input type="file" id="pic1" name="pic1" onChange={getInputfile} className="form-control" />
                        </div>
                        <div className="col-md-6 mb-3 mt-3">
                            <label htmlFor="pic2" className="form-label">Image 2</label>
                            <input type="file" id="pic2" name="pic2" onChange={getInputfile} className="form-control" />
                        </div>
                        <div className="col-md-6 mb-3 mt-3">
                            <label htmlFor="pic3" className="form-label">Image 3</label>
                            <input type="file" id="pic3" name="pic3" onChange={getInputfile} className="form-control" />
                        </div>
                        <div className="col-md-6 mb-3 mt-3">
                            <label htmlFor="pic4" className="form-label">Image 4</label>
                            <input type="file" id="pic4" name="pic4" onChange={getInputfile} className="form-control" />
                        </div>
                        <div className="col-md-12 mb-3 mt-3">
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Updating...' : 'Update Product'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditProduct;
