import * as React from 'react';

import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import Input from '@mui/joy/Input';
import List from '@mui/joy/List';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import gmatch from "../Assest/gmatch.png"
// import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
// import GitHubIcon from '@mui/icons-material/GitHub';
// import SendIcon from '@mui/icons-material/Send';
// import ColorLensRoundedIcon from '@mui/icons-material/ColorLensRounded';

export default function Footer() {
    const [color, setColor] = React.useState('neutral');
    return (
        <Sheet
            variant="solid"
            color={color}
            invertedColors
            sx={{
                ...(color !== 'neutral' && {
                    bgcolor: `${color}.300`,
                }),
                flexGrow: 1,
                p: 2,
                borderRadius: { xs: 0, sm: 0 },
            }}
        >
            
           
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { md: 'flex-start' },
                    justifyContent: 'space-evenly',
                    flexWrap: 'wrap',
                    gap: 1,
                }}
            >
                
                <List
                    size="sm"
                    orientation="horizontal"
                    wrap
                    sx={{ flexGrow: 0, '--ListItem-radius': '8px', '--ListItem-gap': '0px' }}
                >
                    <ListItem nested sx={{ width: { xs: '50%', md: 140 } }}>
                        <ListSubheader sx={{ fontWeight: 'xl' }}>Sitemap</ListSubheader>
                        <List>
                            <ListItem>
                                <ListItemButton>Premium Services</ListItemButton>
                            </ListItem>
                            <ListItem>
                                <ListItemButton>Safety Instructions</ListItemButton>
                            </ListItem>
                            <ListItem>
                                <ListItemButton>Chat Box</ListItemButton>
                            </ListItem>
                        </List>
                    </ListItem>
                    <ListItem nested sx={{ width: { xs: '50%', md: 180 } }}>
                        <ListSubheader sx={{ fontWeight: 'xl' }}>Features</ListSubheader>
                        <List sx={{ '--ListItemDecorator-size': '32px' }}>
                            <ListItem>
                                <ListItemButton>Chat With Friend</ListItemButton>
                            </ListItem>
                            <ListItem>
                                <ListItemButton>Share Interests</ListItemButton>
                            </ListItem>
                            <ListItem>
                                <ListItemButton>Make New Friends</ListItemButton>
                            </ListItem>
                        </List>
                    </ListItem>
                </List>

                <Card
                    variant="soft"
                    size="sm"
                    sx={{
                        flexDirection: { xs: 'row', md: 'column' },
                        minWidth: { xs: '100%', md: 'auto' },
                        gap: 1,
                    }}
                >
                    <AspectRatio
                        ratio="21/9"
                        minHeight={80}
                        sx={{ flexBasis: { xs: 200, md: 'initial' } }}
                    >
                        <img alt="Gmatch" src={gmatch} style={{objectFit: "fill"}} />
                    </AspectRatio>
                    <CardContent>
                        <Typography level="body-sm">Gmatch 2023 Ecosystem</Typography>
                        
                    </CardContent>
                </Card>
            </Box>
        </Sheet>
    );
}