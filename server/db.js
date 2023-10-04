const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  port: "5432",
  database: "smoothmove",
});
const queryDatabase = (sql, params) => {
  return new Promise((resolve, reject) => {
    pool
      .query(sql, params)
      .then((result) => resolve(result.rows))
      .catch((err) => {
        console.error("Error:", err.message);
        reject(err);
      });
  });
};

const addProperty = async (property) => {
  const sql = `
    INSERT INTO properties (
      owner_id,
      title,
      description,
      thumbnail_photo_url,
      cover_photo_url,
      cost_per_month,
      street,
      city,
      province,
      post_code,
      country,
      area,
      number_of_bathrooms,
      number_of_bedrooms
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`;

  const params = [
    property.owner_id,
    property.title,
    property.description,
    property.thumbnail_photo_url,
    property.cover_photo_url,
    property.cost_per_month,
    property.street,
    property.city,
    property.province,
    property.post_code,
    property.country,
    property.area,
    property.number_of_bathrooms,
    property.number_of_bedrooms,
  ];

  const result = await queryDatabase(sql, params);

  return result[0];
};

const getPropertyById = async (propertyId) => {
  const sql = `
    SELECT properties.*, images.photo_url
    FROM properties
    LEFT JOIN images ON properties.id = images.property_id
    WHERE properties.id = $1;
  `;
  const params = [propertyId];

  const result = await queryDatabase(sql, params);
  console.log("result", result);
  if (result.length === 0) {
    return null;
  }

  // Group images by property ID
  const property = {
    ...result[0],
    images: result.map((row) => row.photo_url).filter((url) => url !== null),
  };
  console.log("property :", property);
  return property;
};

const getAllProperties = (query, city, province, postcode, limit = 10) => {
  const queryParams = [];
  let queryString = `
    SELECT * FROM properties
    WHERE 1=1
  `;

  if (query) {
    queryParams.push(`%${query}%`);
    queryString += ` AND (title LIKE $${queryParams.length} OR description LIKE $${queryParams.length}) `;
  }

  if (city) {
    queryParams.push(`%${city}%`);
    queryString += ` AND city LIKE $${queryParams.length} `;
  }

  if (province) {
    queryParams.push(`%${province}%`);
    queryString += ` AND province LIKE $${queryParams.length} `;
  }

  if (postcode) {
    queryParams.push(`%${postcode}%`);
    queryString += ` AND post_code LIKE $${queryParams.length} `;
  }

  console.log(queryString);
  return queryDatabase(queryString, queryParams);
};

module.exports = { pool, getAllProperties, getPropertyById, addProperty };
