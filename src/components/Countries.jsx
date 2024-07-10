import React, { useState, useEffect } from 'react';
import '../App';
import axios from 'axios';
import LinearProgress from '@mui/material/LinearProgress';
import Container from '@mui/material/Container';
import { Button, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const Countries = ({ clearSelectedRegionHandler, selectedRegion }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios({
            method: 'GET',
            url: `https://restcountries.com/v3.1/region/${selectedRegion}`
        })
        .then(response => {
            console.log(response.data);
            setData(response.data);
        })
        .catch(e => console.log(e))
        .finally(() => setLoading(false));
    }, [selectedRegion]);

    return (
        <Container fixed>
            {loading ? (
                <div className="progress">
                    <LinearProgress color='primary' />
                </div>
            ) : (
                <Grid container spacing={3} columns={12} sx={{ margin: '20px 0' }}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Button 
                            color='primary' 
                            variant='contained' 
                            onClick={() => clearSelectedRegionHandler()}
                        >
                            Pick another Region
                        </Button>
                    </Grid>

                    {data.map((country) => (
                        <Grid item xs={12} sm={12} md={6} lg={6} key={country.name.common}> 
                            <Card sx={{ maxWidth: 500 }}>
                                <CardMedia  
                                    component="img"
                                    alt="countries"
                                    image={country.flags && country.flags.png ? country.flags.png : 'default_image_url'}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {country.name.common}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {`Subregion: ${country.subregion || 'N/A'}, Capital: ${country.capital && Array.isArray(country.capital) ? country.capital[0] : 'N/A'}, Population: ${country.population}, Language: ${country.languages ? Object.values(country.languages).join(', ') : 'N/A'}`}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default Countries;