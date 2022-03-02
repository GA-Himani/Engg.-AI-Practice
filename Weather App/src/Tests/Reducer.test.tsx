import Store from "../Redux/Store";
import { addData,showDetailReducer, showLoading,hideLoading } from "../Redux/SliceReducer";

test("Should set the data ", () => {
  Store.dispatch(
    addData([{
capital: "Diego Garcia",
flag: "https://flagcdn.com/io.svg",flags: {svg: 'https://flagcdn.com/io.svg', png: 'https://flagcdn.com/w320/io.png'},
latlng: [-6, 71.5],
name: "British Indian Ocean Territory",
population: 3000,
area: 60
}])
  );
  let state: any= Store.getState().data;
  const value = state.data.find((val:any) => val.area === 60)
  expect(value?.capital).toBe("Diego Garcia");
  expect(value?.name).toBe("British Indian Ocean Territory");
}); 

test('check the showDetail reducer',()=>{
Store.dispatch(showDetailReducer(true))
const state:any  = Store.getState().data
const value =  state.showDetail
expect(value).toBe(true)
})

test('check the showLoading reducer',()=>{
  Store.dispatch(showLoading(true))
  const state:any  = Store.getState().data
  const value =  state.isLoading
  expect(value).toBe(true)
  })
test('check the hideLoading reducer',()=>{
  Store.dispatch(hideLoading(false))
  const state:any  = Store.getState().data
  const value =  state.isLoading
  expect(value).toBe(false)
  })