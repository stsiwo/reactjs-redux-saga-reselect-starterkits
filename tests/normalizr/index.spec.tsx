import { normalize, denormalize } from "normalizr"; 
import { animeSchemaArray } from "states/state";
  
describe('normalizr lib testing', () => {

  // sample anime data
  const sampleAnimeData = [
    {
      id: 1,
      title: "1",
    }, 
    {
      id: 2,
      title: "2",
    }, 
    {
      id: 3,
      title: "3",
    }, 
    {
      id: 4,
      title: "4",
    }, 
  ]
  
  // normalize
  const normalizedData = normalize(sampleAnimeData, animeSchemaArray)
  
  it("", () => {
  
    //console.log(JSON.stringify(normalizedData, getCircularReplacer(), 2))
    console.log(JSON.stringify(normalizedData))

    const denormalizedEntity = denormalize([1], animeSchemaArray, normalizedData.entities)

    console.log(denormalizedEntity)
  
    expect(1).toBe(2)    
  
  })
  
})

