
# coding: utf-8

# In[148]:

import os
import gpxpy
import gpxpy.gpx
import numpy as np
import json
from glob import glob


# In[149]:

def parse_data():
    gpx_files = []
    vectors = []
    
    for file in glob("gpx_data/*.gpx"):
        gpx_file = gpxpy.parse(open(file))
        gpx_files.append(os.path.basename(file))
        
        for track in gpx_file.tracks:
            vector = [(point.latitude, point.longitude) for segment in track.segments for point in segment.points]
            vectors.append(vector)
    return vectors, gpx_files


# In[150]:

def parse_request_data(json_data):
    paths = []
    for json_object in json.loads(json_data):
        with open("gpx_data/{}.gpx".format(json_object['user']), 'w') as f:
            f.write(json_object['gpx'])
            
        gpx_file = gpxpy.parse(json_object['gpx'])
        
        for track in gpx_file.tracks:
            path = [(point.latitude, point.longitude) for segment in track.segments for point in segment.points]
            paths.append(path)
            
        break # request should only have 1 person
    
    return paths, json_object['user']


# In[151]:

class BoundingBox(object):
    """
    A 2D bounding box
    """
    def __init__(self, points):
        if len(points) == 0:
            raise ValueError("Can't compute bounding box of empty list")
        self.minx, self.miny = float("inf"), float("inf")
        self.maxx, self.maxy = float("-inf"), float("-inf")
        for x, y in points:
            # Set min coords
            if x < self.minx:
                self.minx = x
            if y < self.miny:
                self.miny = y
            # Set max coords
            if x > self.maxx:
                self.maxx = x
            elif y > self.maxy:
                self.maxy = y
        self.midx = (self.minx + self.maxx) / 2
        self.midy = (self.miny + self.maxy) / 2
    @property
    def width(self):
        return self.maxx - self.minx
    @property
    def height(self):
        return self.maxy - self.miny

    def mid(self):
        return [self.midx, self.midy]
    def __repr__(self):
        return "BoundingBox({}, {}, {}, {})".format(
            self.minx, self.miny, self.maxx,self.maxy)


# In[152]:

def score(paths):
    score_matrix = np.array([np.array([np.inf for _ in range(len(paths))], dtype="float64") for _ in range(len(paths))])
    for i in range (len(paths)):
        for j in range (i+1, len(paths)):
                b1 = BoundingBox(paths[i])
                b2 = BoundingBox(paths[j])
                m1 = b1.mid()
                m2 = b2.mid()
                score = ((m2[0] - m1[0]) **2 + (m2[1] - m1[0]) **2) ** 1/2
                score_matrix[i][j] = score
                score_matrix[j][i] = score

    score_matrix=np.array(score_matrix).reshape(len(paths), len(paths))
    return score_matrix            


# In[153]:

# Main entry point
def handle_request(json_data):
    user_path, user = parse_request_data(json)
    paths, gpx_files = parse_data()
    
    score_matrix= score(paths)
    # Get the row INDICES of the score matrix that corresponds to the user requested, and pull the top 5 scores
    top5 = score_matrix[gpx_files.index("%s.gpx" % user)].argsort()[:5]
    
    # results: filenames, a.k.a. the users which are selected as the top 5 matches
    results = [gpx_files[top] for top in tops]
   
    # return a JSON object as response
    j = {
        0: {
            'name': gpx_files[top5[0]],
            'coords': paths[top5[0]]
        },
        1: {
        'name': gpx_files[top5[1]],
        'coords': paths[top5[1]]
        },
        2: {
        'name': gpx_files[top5[2]],
        'coords': paths[top5[2]]
        },
        3: {
        'name': gpx_files[top5[3]],
        'coords': paths[top5[3]]
        }, 
        4: {
        'name': gpx_files[top5[4]],
        'coords': paths[top5[4]]
        }, 
    }
    return json.dumps(j)

