import pandas as pd
import csv
import json
import sqlite3
import mysql.connector
from mysql.connector import Error

def csvtoJson(csvSrc, jsonDest, fields):
    f = open(csvSrc, 'rU', encoding="cp866")

    reader = csv.DictReader(f, fieldnames = fields)
    next(reader)
    #parsing json
    out = json.dumps([row for row in reader])

    f = open(jsonDest, 'w')
    f.write(out)
    print(jsonDest + ' JSON file saved')

def formatJSON(src, dest):
    list = []
    with open(src, 'r') as fp:
        list = json.load(fp)
    with open(dest, 'w') as fp:
        json.dump(list, fp, indent=2)
    print (dest + "readable json complete")

def createTable_ninHealthFacilities():
    conn = mysql.connector.connect(host='classmysql.engr.oregonstate.edu',
                                    database='cs540_ummaredd',
                                    user='cs540_ummaredd',
                                    password='neha123')
    c= conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS cs540_ninHealthFacilities
                (SNo int,
                HealthFacilityName text,
                Address text, 
                street text, 
                landmark text,
                locality text,
                pincode int, 
                landline_number int, 
                latitude float,
                longitude float,
                altitude float,
                FacilityType text,
                State_Name text,
                District_Name text,
                Taluka_Name text,
                Block_Name text
                )''')
    print("table: cs540_ninHealthFacilities created!")
    conn.commit()
    conn.close()

def insertJSONtoDB_ninHealthFacilities(JsonUnformattedsrc, cols):
    print("inserting Data...")
    conn = mysql.connector.connect(host='classmysql.engr.oregonstate.edu',
                                   database='cs540_ummaredd',
                                   user='cs540_ummaredd',
                                   password='neha123')
    c = conn.cursor()
    with open(JsonUnformattedsrc, 'r') as fp:
        projectlist = json.load(fp)

    for p in projectlist:
        print(p[cols[0]])
        query = "INSERT INTO cs540_ninHealthFacilities(SNo ,HealthFacilityName , Address ,street,landmark,locality,pincode,landline_number,latitude,longitude ,altitude,FacilityType,State_Name,District_Name,Taluka_Name,Block_Name)" \
                "VALUES (%s, %s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        args = (
        p[cols[0]], p[cols[1]], p[cols[2]], p[cols[3]], p[cols[4]], p[cols[5]], p[cols[6]], p[cols[7]], p[cols[8]],
        p[cols[9]], p[cols[10]], p[cols[11]], p[cols[12]], p[cols[13]], p[cols[14]], p[cols[15]])

        c.execute(query, args)
    conn.commit()
    conn.close()
    print("Data inserted: insertJSONtoDB_ninHealthFacilities")

# ninHealthfacilities table
def processNinHealthFacilties():
    src = "./RawDatasets/nin-health-facilities.csv"
    dst = "./RawDatasets/TempJson/jsonfile.json"
    dstf = "./RawDatasets/TempJson/jsonfile_formated.json"

    headerrow = (
        "SNo", "HealthFacilityName", "Address", "street", "landmark", "locality", "pincode", "landline_number",
        "latitude", "longitude", "altitude", "FacilityType", "State_Name", "District_Name", "Taluka_Name", "Block_Name")

    csvtoJson(csvSrc=src, jsonDest=dst, fields= headerrow )
    formatJSON(dst, dstf)


    createTable_ninHealthFacilities()
    insertJSONtoDB_ninHealthFacilities(JsonUnformattedsrc=dstf, cols=headerrow)

def createTable_hospitalwithDiscipline():
    conn = mysql.connector.connect(host='classmysql.engr.oregonstate.edu',
                                   database='cs540_ummaredd',
                                   user='cs540_ummaredd',
                                   password='neha123')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS cs540_hospitalWithDiscipline
                    (Sno INT AUTO_INCREMENT PRIMARY KEY,
                     State text,
                     City text,
                     HospitalPrivate text,
                     Category text,
                     SystemsOfMedicine text,
                     ContactDetails text,
                     PinCode int,
                     EmailAddress text,
                     WebsiteLink text,
                     Specializations text,
                     Services text                     
                    )''')
    print("table: cs540_hospitalWithDiscipline created!")
    conn.commit()
    conn.close()

def insertJSONtoDB_hospitalwithDiscipline(JsonUnformattedsrc, cols):
    print("inserting Data...")
    conn = mysql.connector.connect(host='classmysql.engr.oregonstate.edu',
                                   database='cs540_ummaredd',
                                   user='cs540_ummaredd',
                                   password='neha123')
    c = conn.cursor()
    with open(JsonUnformattedsrc, 'r') as fp:
        projectlist = json.load(fp)

    for p in projectlist:
        print(p[cols[0]])
        query = "INSERT INTO cs540_hospitalWithDiscipline(State,City,HospitalPrivate ,Category,SystemsOfMedicine,ContactDetails,PinCode,EmailAddress,WebsiteLink,Specializations,Services)" \
                "VALUES (%s, %s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        args = (
            p[cols[0]], p[cols[1]], p[cols[2]], p[cols[3]], p[cols[4]], p[cols[5]], p[cols[6]], p[cols[7]],
            p[cols[8]],
            p[cols[9]], p[cols[10]])

        c.execute(query, args)
    conn.commit()
    conn.close()
    print("Data inserted: insertJSONtoDB_hospitalwithDiscipline")

def processHopsitalwithDiciplineTable():
    # hospitalwithDiscipline
    src = "./RawDatasets/Hospital_with_discipline_jul_15.csv"
    dst = "./RawDatasets/TempJson/jsonfile_hospitalwithDiscipline.json"
    dstf = "./RawDatasets/TempJson/jsonfile_formated_hospitalwithDiscipline.json"
    headerrow = (
    "State", "City", "HospitalPrivate", "Category", "SystemsOfMedicine", "ContactDetails", "PinCode", "EmailAddress",
    "WebsiteLink", "Specializations", "Services")
    csvtoJson(src, dst, headerrow)
    formatJSON(dst, dstf)

    createTable_hospitalwithDiscipline()
    insertJSONtoDB_hospitalwithDiscipline(dstf, headerrow)

def createTable_PopulationDensityData():
    conn = mysql.connector.connect(host='classmysql.engr.oregonstate.edu',
                                   database='cs540_ummaredd',
                                   user='cs540_ummaredd',
                                   password='neha123')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS cs540_populationDensityData
                    (Sno INT AUTO_INCREMENT PRIMARY KEY,
                    Category text,
                    Name text,
                    Population int, 
                    DecadalPopulationGrowthRate2001to11 float,
                    PopulationDensityPerSqKm int                                          
                    )''')
    print("table: cs540_populationDensityData created!")
    conn.commit()
    conn.close()

def insertJSONtoDB_populationDensityData(JsonUnformattedsrc, cols):
    print("inserting Data...")
    conn = mysql.connector.connect(host='classmysql.engr.oregonstate.edu',
                                   database='cs540_ummaredd',
                                   user='cs540_ummaredd',
                                   password='neha123')
    c = conn.cursor()
    with open(JsonUnformattedsrc, 'r') as fp:
        projectlist = json.load(fp)

    for p in projectlist:
        print(p[cols[0]])
        query = "INSERT INTO cs540_populationDensityData(Category, Name, Population, DecadalPopulationGrowthRate2001to11, PopulationDensityPerSqKm)" \
                "VALUES (%s, %s,%s,%s,%s)"
        args = (
            p[cols[0]], p[cols[1]], p[cols[2]], p[cols[3]], p[cols[4]])

        c.execute(query, args)
    conn.commit()
    conn.close()
    print("Data inserted: insertJSONtoDB_PopulationDensityData")

def processPopulationDensityData():
    # PopulationDensityData
    src = "./RawDatasets/PopulationDensityData.csv"
    dst = "./RawDatasets/TempJson/jsonfile_PopulationDensityData.json"
    dstf = "./RawDatasets/TempJson/jsonfile_formated_PopulationDensityData.json"
    headerrow = (
        "Category", "Name", "Population", "DecadalPopulationGrowthRate2001to11", "PopulationDensityPerSqKm")
    csvtoJson(src, dst, headerrow)
    formatJSON(dst, dstf)

    createTable_PopulationDensityData()
    insertJSONtoDB_populationDensityData(dstf, headerrow)

def createTable_StatePopulationinDetail():
    conn = mysql.connector.connect(host='classmysql.engr.oregonstate.edu',
                                   database='cs540_ummaredd',
                                   user='cs540_ummaredd',
                                   password='neha123')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS cs540_statePopulationinDetail
                    (Sno INT AUTO_INCREMENT PRIMARY KEY,
                    StateNo int,
                    DistrictNo int,
                    subdistNo int,
                    TownVillageNo int,
                    Ward int,
                    Level text,
                    Name text,
                    TotalRuralUrban text,
                    No_HH int,
                    Population int,
                    MalePopulation int,
                    FemalePopulation int                                         
                    )''')
    print("table: cs540_StatePopulationinDetail created!")
    conn.commit()
    conn.close()

def insertJSONtoDB_StatePopulationinDetail(JsonUnformattedsrc, cols):
    print("inserting Data...")
    conn = mysql.connector.connect(host='classmysql.engr.oregonstate.edu',
                                   database='cs540_ummaredd',
                                   user='cs540_ummaredd',
                                   password='neha123')
    c = conn.cursor()
    with open(JsonUnformattedsrc, 'r') as fp:
        projectlist = json.load(fp)

    for p in projectlist:
        print(p[cols[0]])
        query = "INSERT INTO cs540_statePopulationinDetail(StateNo,DistrictNo,subdistNo,TownVillageNo,Ward,Level,Name,TotalRuralUrban,No_HH,Population,MalePopulation,FemalePopulation)" \
                "VALUES (%s, %s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        args = (
            p[cols[0]], p[cols[1]], p[cols[2]], p[cols[3]], p[cols[4]],p[cols[6]],p[cols[7]],p[cols[8]],p[cols[9]],p[cols[10]],p[cols[11]],p[cols[12]])

        c.execute(query, args)
    conn.commit()
    conn.close()
    print("Data inserted: insertJSONtoDB_StatePopulationinDetail")

def main():
    print("executing")
    #processNinHealthFacilties()
    #processHopsitalwithDiciplineTable()
    #processPopulationDensityData()

    #StatePopulationinDetail
    src = "./RawDatasets/StatePopulationinDetail.csv"
    dst = "./RawDatasets/TempJson/jsonfile_StatePopulationinDetail.json"
    dstf = "./RawDatasets/TempJson/jsonfile_formated_StatePopulationinDetail.json"
    headerrow = (
        "StateNo","DistrictNo","subdistNo","TownVillageNo","Ward","EB","Level","Name","TotalRuralUrban","No_HH","Population","MalePopulation","FemalePopulation")
    #csvtoJson(src, dst, headerrow)
    #formatJSON(dst, dstf)

    createTable_StatePopulationinDetail()
    insertJSONtoDB_StatePopulationinDetail(dstf, headerrow)









if __name__ == "__main__":
    main()
    
    


