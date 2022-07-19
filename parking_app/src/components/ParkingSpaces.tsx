import {
	Card,
	CardContent,
	Grid,
	CardActions,
	Button,
	Typography,
	Modal,
	Box,
	Paper,
	TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
const style = {
	position: "absolute" as "ablsoute",
	width: "50%",
	top: "50%",
	left: "50%",
	transform: "translate(-50%,-50%)",
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4,
};

const ParkingSpaces = () => {
	const { noOfSpaces }: any = useParams();
	let arr: any = [];
	const [parkingSpaces, setParkingSpaces] = useState<any>([]);
	const [open, setOpen] = useState(false);
	const [registerNo, setRegisterNo] = useState("");
	const [modalData, setModalData] = useState<any>({});
	const [isOpen, setIsOpen] = useState(false);
	const current: any = new Date();
	useEffect(() => {
		for (let i = 1; i <= noOfSpaces; i++) {
			//arr.push({ parkingSpace: `parkingSpace${i}`, isEmpty: true });
			arr = [...arr, { parkingSpace: `parkingSpace${i}`, isEmpty: true }];
			console.log(arr);
		}
		setParkingSpaces(arr);
	}, []);
	//open register form
	const handleClick = () => {
		setIsOpen(true);
	};
	const handleChange = (e: any) => {
		setRegisterNo(e.target.value);
	};
	const handleRegisterClose = () => {
		setIsOpen(false);
	};
	//register form onSubmit
	const handleSubmit = (e: any) => {
		e.preventDefault();
		const freeSpaces = parkingSpaces.filter((val: any) => val.isEmpty);
		const allotedSpace =
			freeSpaces[Math.floor(Math.random() * freeSpaces.length)];
		if (allotedSpace) {
			const data = parkingSpaces.map((val: any) => {
				if (val.parkingSpace === allotedSpace.parkingSpace) {
					return {
						...val,
						isEmpty: false,
						registerNo: registerNo,
						time: `${current.getHours()}.${current.getMinutes()}`,
					};
				} else {
					return val;
				}
			});
			setParkingSpaces(data);
		} else {
			toast("parking is full");
		}
		setRegisterNo("");
		setIsOpen(false);
	};
	//calculating parking charges and open modal with charges and buttons
	const onExit = (data: any) => {
		setOpen(true);
		const time: any = `${current.getHours()}.${current.getMinutes()}`;
		console.log(time, data.time, time - data.time);
		const parkingTime = time - data.time;
		if (Math.ceil(parkingTime) % 2 === 0 && Math.ceil(parkingTime) !== 0) {
			setModalData({
				charges: Math.ceil(parkingTime) * 5,
				registerNo: data.registerNo,
			});
		} else if (Math.ceil(parkingTime) === 0) {
			setModalData({
				charges: 10,
				registerNo: data.registerNo,
				parkingSpace: data.parkingSpace,
			});
		} else {
			setModalData({
				charges: (Math.ceil(parkingTime) + 1) * 5,
				registerNo: data.registerNo,
				parkingSpace: data.parkingSpace,
			});
		}
	};
	const handleClose = () => {
		setOpen(false);
	};
	//handle payment sending request and deregistering car
	const handlePayment = () => {
		axios
			.post("https://httpstat.us/200", {
				car_registration: modalData.registerNo,
				charge: modalData.charge,
			})
			.then((res: any) => {
				console.log(res.data);
				toast(`response with status ${res.data.description}`);
			})

			.catch((err: any) => console.log(err));

		const data = parkingSpaces.map((val: any) => {
			if (val.parkingSpace === modalData.parkingSpace) {
				return {
					parkingSpace: modalData.parkingSpace,
					isEmpty: true,
				};
			} else {
				return val;
			}
		});
		setParkingSpaces(data);
		setOpen(false);
	};
	return (
		<>
			<Paper style={{ width: "90%", margin: "10px auto" }}>
				<Grid
					container
					style={{ justifyContent: "center", marginTop: "10px" }}
				>
					<Button
						color="primary"
						size="large"
						variant="contained"
						onClick={handleClick}
						data-testid="register-button"
					>
						Register car
					</Button>
				</Grid>
				<Grid container>
					{parkingSpaces.map((val: any) => (
						<Grid
							item
							xs={6}
							key={val.parkingSpace}
							data-testid="parking-drawing-space"
						>
							<Card
								sx={{ maxWidth: 400, m: 5 }}
								data-testid={
									val.isEmpty
										? `parking-drawing-space-${val.parkingSpace}`
										: `parking-drawing-registered-${val.parkingSpace}`
								}
							>
								<CardContent>
									<Typography>{val.parkingSpace}</Typography>
								</CardContent>
								{val.isEmpty === false ? (
									<>
										<CardContent>
											<Typography>
												registerNo:{val.registerNo}
											</Typography>
											<Typography>
												Time:{val.time}
											</Typography>
										</CardContent>
										<CardActions>
											<Button
												onClick={() => onExit(val)}
												data-testid="deregister-car-registration"
											>
												exit
											</Button>
										</CardActions>
									</>
								) : null}
							</Card>
						</Grid>
					))}
				</Grid>
				<Modal open={open} onClose={handleClose}>
					<Box sx={style}>
						<Typography data-testid="deregister-charge">
							charges:{modalData.charges}
						</Typography>
						<Button
							data-testid="deregister-payment-button"
							onClick={handlePayment}
						>
							payment
						</Button>
						<Button
							data-testid="deregister-back-button"
							onClick={() => setOpen(false)}
						>
							Back
						</Button>
					</Box>
				</Modal>
				<Modal open={isOpen} onClose={handleRegisterClose}>
					<Box sx={style}>
						<form onSubmit={handleSubmit}>
							<TextField
								label="Enter car register no"
								value={registerNo}
								onChange={handleChange}
								required
							/>
							<br />
							<br />
							<TextField
								label="Time"
								value={`${current.getHours()}.${current.getMinutes()}`}
								onChange={handleChange}
							/>
							<br />
							<br />
							<Button
								type="submit"
								variant="contained"
								data-testid="registertion-submit-button"
							>
								submit
							</Button>
						</form>
					</Box>
				</Modal>
			</Paper>
		</>
	);
};

export default ParkingSpaces;
